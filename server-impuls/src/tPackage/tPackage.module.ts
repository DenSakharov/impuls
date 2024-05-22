import { Module } from '@nestjs/common';
import { tPackageController } from './tPackage.controller';
import { tPackageProviders } from './tPackage.provider';
import { tPackageService } from './tPackage.service';

@Module({
  imports: [],
  controllers: [tPackageController],
  providers: [tPackageService, ...tPackageProviders],
})
export class tPackageModule {}
