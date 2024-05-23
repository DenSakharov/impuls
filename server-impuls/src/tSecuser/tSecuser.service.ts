import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { tSecuser } from '#/tSecuser/tSecuser';
import * as bcrypt from 'bcrypt';
import { TMessage } from '#/entities/Message';

@Injectable()
export class tSecuserService {
  constructor(
    @Inject('SECUSER_REPOSITORY')
    private tSecuserRepository: typeof tSecuser,
  ) {}

  async create(newUser: Partial<tSecuser>): Promise<TMessage> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const userUUID = crypto.randomUUID();
    try {
      await this.tSecuserRepository.create({
        userid: userUUID,
        userlogin: newUser.userlogin,
        userEmail: newUser.userEmail,
        firstname: newUser.firstname,
        surname: newUser.surname,
        department: newUser.department,
        password: hashedPassword,
        groupid: newUser.groupid,
      });
      return {
        message: `created new user with id = ${userUUID} `,
        status: HttpStatus.CREATED,
        uuid: userUUID,
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return {
          error: 'This login already exists',
          status: HttpStatus.CONFLICT,
        };
      } else {
        return { error: error.name, status: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    }
  }

  async findAll(): Promise<tSecuser[]> {
    return this.tSecuserRepository.findAll<tSecuser>();
  }

  async findByPk(uuid: string): Promise<tSecuser | undefined> {
    return this.tSecuserRepository.findByPk<tSecuser>(uuid);
  }

  async findOne(loginToFind: string): Promise<tSecuser | undefined> {
    return this.tSecuserRepository.findOne<tSecuser>({
      where: { userlogin: loginToFind },
    });
  }
}
