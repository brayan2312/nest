import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    }
    this.cars.push(car);
    return car;
  }

  update(id: string, carUpdate: UpdateCarDto){
    let carDB = this.findOneById(id);

      if( carUpdate.id && carUpdate.id !== id)
        throw new BadGatewayException('Car id is not valid inside body');


    this.cars = this.cars.map( car => {
      if(car.id === id){
        carDB = { ...carDB, ...carUpdate, id}        
        return carDB;
      }

      return car;
    })

    return carDB;
  }

  delete(id: string){
    let carDB = this.findOneById(id);

    if(!carDB){
      throw new BadGatewayException('No existe el id de ese');
    }

    this.cars = this.cars.filter( car => car.id !== id);

  }
}
