import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private categories = [
    { id: 1, name: 'Food', description: 'Groceries, dining out, etc.' },
    { id: 2, name: 'Salary', description: 'Monthly income' },
  ];

  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = {
      id: this.categories.length + 1,
      name: createCategoryDto.name,
      description: createCategoryDto.description || '',
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find(cat => cat.id === id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (!category) return null;

    Object.assign(category, updateCategoryDto);
    return category;
  }

  remove(id: number) {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) return null;
    const removed = this.categories.splice(index, 1);
    return removed[0];
  }
}
