import { Injectable, Inject } from '@nestjs/common';
import { tSecuser } from '#/tSecuser/tSecuser';
import * as bcrypt from 'bcrypt';
import { ADDRGETNETWORKPARAMS } from 'dns';
import { PassThrough } from 'stream';


@Injectable()
export class tSecuserService {
  constructor(
    @Inject('SECUSER_REPOSITORY')
    private tSecuserRepository: typeof tSecuser,
  ) {}

  async create(newUser: Partial<tSecuser>): Promise<string> {
    try {

      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const userUUID = crypto.randomUUID();

      this.tSecuserRepository.create({
        userid: userUUID,
        userlogin: newUser.userlogin,
        firstname: newUser.firstname,
        surname: newUser.surname,
        department: newUser.department,
        password: hashedPassword,
        groupid: newUser.groupid,
      });
      return `created new user with id = ${userUUID} `;
    } catch (e) {
      return `error ${e} while creating`;
    }
  }

  async findAll(): Promise<tSecuser[]> {
    return this.tSecuserRepository.findAll<tSecuser>();
  }

  async findByPk(uuid: string): Promise<tSecuser | undefined> {
    return this.tSecuserRepository.findByPk<tSecuser>(uuid);
  }

  async findOne(userlogin: string): Promise<tSecuser | undefined>{
    return this.tSecuserRepository.findOne<tSecuser>({where: { userlogin: userlogin}});
  }
}