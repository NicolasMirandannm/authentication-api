import { IsEmail } from "class-validator";
import { IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserEntity } from "src/models/user.entity";

export class CreateUserDto extends UserEntity {

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('BR')
    @IsString()
    phoneNumber: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { // esse metche faz com que a senha tenha letras maiusculas e minusculas e numeros
        message: 'password too weak',
    })
    password: string;

}