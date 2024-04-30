import { Injectable, Inject } from '@nestjs/common';
import { tSecuser } from '#/tSecuser/tSecuser';
import { UUID } from 'crypto';

@Injectable()
export class tSecuserService {
  constructor(
    @Inject('SECUSER_REPOSITORY')
    private tSecuserRepository: typeof tSecuser,
  ) {}

  async create(newUser: Partial<tSecuser>): Promise<string> {
    try {
    this.tSecuserRepository.create({
      userid: newUser.userid,
      userlogin: newUser.userlogin,
      firstname: newUser.firstname,
      surname: newUser.surname,
      department: newUser.department,
      password: newUser.password,
      groupid: newUser.groupid,
    });
    return `created new user with id = ${newUser.userid} `
    } catch (e) {
    return `error ${e} while creating`
    }
  }

  async findAll(): Promise<tSecuser[]> {
    return this.tSecuserRepository.findAll<tSecuser>();
  }

  async findOne(userID: UUID): Promise<tSecuser | undefined> {
    return this.tSecuserRepository.findByPk<tSecuser>(userID);
  }
}