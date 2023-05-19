import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

  private cars: Car[] = [];

  findAll() {
    return this.cars;
  }

  findOneById( id: string ) {
    const car = this.cars.find( car => car.id == id);
    if( !car ) throw new NotFoundException(`Car with id '${ id }' not found`);
    return car;
  }

  create( createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    };
     this.cars = [...this.cars, car];
     return car
  }

  update( id: string, updateCarDto: UpdateCarDto ) {
    let carDB = this.findOneById( id );
    if( updateCarDto.id && updateCarDto.id !== id )
      throw new BadRequestException(`Car id is not valid inside body`);
    this.cars = this.cars.map( car => {
      if( car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car
    })
  }

  delete( id: string ) {
    this.findOneById( id );
    this.cars = this.cars.filter( car => car.id != id);
  }

  fillCarsWithSeedData( cars: Car[] ){
    this.cars = cars;
  }
}
