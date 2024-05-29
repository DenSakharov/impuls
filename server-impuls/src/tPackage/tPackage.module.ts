import { Module } from '@nestjs/common';
import { tPackageController } from './tPackage.controller';
import { tPackageProviders } from './tPackage.provider';
import { tPackageService } from './tPackage.service';
import { tChangehistoryModule } from '#/tHistory/tChangehistory.module';

@Module({
  imports: [tChangehistoryModule],
  controllers: [tPackageController],
  providers: [tPackageService, ...tPackageProviders],
})
export class tPackageModule {}
