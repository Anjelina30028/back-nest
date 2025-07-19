import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { UserModel } from 'src/user/user.model'
import { AuthDto } from './dto/auth.dto'
import { hash, genSalt, compare } from 'bcryptjs'
import passport from 'passport'
import { JwtService } from '@nestjs/jwt'
import { refreshTokenDto } from './dto/refreshToken'
import { UpdateUserDto } from 'src/user/dto/update-user.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async getNewTokens({ refreshToken }: refreshTokenDto) {
		if (!refreshToken)
			throw new UnauthorizedException('Вам нужно авторизоваться')

		const result = await this.jwtService.verifyAsync(refreshToken)
		if (!result) throw new UnauthorizedException('Не действительный токен')

		const user = await this.UserModel.findById(result._id)

		const tokens = await this.issueTokenPair(String(user._id))
		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register({ name, email, password, project }: UpdateUserDto) {
		const salt = await genSalt(10)
		const newUser = new this.UserModel({
			name,
			email,
			password: await hash(password, salt),
			project,
		})
		const user = await newUser.save()

		const tokens = await this.issueTokenPair(String(user._id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async findByEmail(email: string) {
		return this.UserModel.findOne({ email }).exec()
	}

	async validateUser(dto: AuthDto): Promise<UserModel> {
		const user = await this.UserModel.findOne({ email: dto.email })
		if (!user)
			throw new UnauthorizedException('Пользователь с таким email не найден')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword)
			throw new UnauthorizedException('Вы ввели неверный пароль')

		return user
	}

	async issueTokenPair(userId: string) {
		const data = { _id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	}

	returnUserFields(user: UserModel) {
		return {
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			project: user.project
		}
	}
}
