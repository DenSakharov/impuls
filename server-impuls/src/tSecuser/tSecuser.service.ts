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
        userEmail: newUser.userEmail,
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

  async findOne(loginToFind: string): Promise<tSecuser | undefined> {
    return this.tSecuserRepository.findOne<tSecuser>({
      where: { userlogin: loginToFind },
    });
  }

  async update(userToUpdate: tSecuser): Promise<tSecuser | undefined> {
    const user = await this.findByPk(userToUpdate.userid);
    return user.update(userToUpdate);
  }

  async replacePassword(userlogin: string, oldPass: string, newPass: string): Promise<tSecuser|string> {
    let user = await this.tSecuserRepository.findOne<tSecuser>({where: { userlogin: userlogin }});

    try {
      if (!(await bcrypt.compare(oldPass, user.password))) {
        throw new Error('Old password is incorrect!');
      }
    } catch (e) {
      return 'Old password is incorrect!';
    }
    
    const hashedPassword = await bcrypt.hash(newPass, 10);
    const newUser = JSON.parse(JSON.stringify(user))
    newUser.password = hashedPassword

    return user.update(newUser);
  }
}