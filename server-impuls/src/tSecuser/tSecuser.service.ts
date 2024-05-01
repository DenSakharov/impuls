import { Injectable, Inject } from '@nestjs/common';
import { tSecuser } from '#/tSecuser/tSecuser';
import * as bcrypt from 'bcrypt';


@Injectable()
export class tSecuserService {
  constructor(
    @Inject('SECUSER_REPOSITORY')
    private tSecuserRepository: typeof tSecuser,
  ) {}

  async create(newUser: Partial<tSecuser>): Promise<string> {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const userUUID = crypto.randomUUID();
      try {

      
      await this.tSecuserRepository.create({
        userid: userUUID,
        userlogin: newUser.userlogin,
        firstname: newUser.firstname,
        surname: newUser.surname,
        department: newUser.department,
        password: hashedPassword,
        groupid: newUser.groupid,
      });

      return `created new user with id = ${userUUID} `;
    } catch(error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return 'This login already exists';
      } else {
        return error.name;        
      }
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