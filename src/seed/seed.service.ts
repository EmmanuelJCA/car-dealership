import { Injectable } from '@nestjs/common';
import { BrandsService } from '../brands/brands.service';
import { CarsService } from '../cars/cars.service';
import { BRAND_SEED } from './data/brands.seed';
import { CAR_SEED } from './data/cars.seed';

@Injectable()
export class SeedService {

  constructor(
    private readonly brandsService: BrandsService,
    private readonly carsService: CarsService,
  ) {}

  populateDB() { 
    this.brandsService.fillBrandsWithSeedData( BRAND_SEED );
    this.carsService.fillCarsWithSeedData( CAR_SEED );
    return 'seed executed';
  }

}
