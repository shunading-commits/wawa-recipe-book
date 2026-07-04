const categories = [
  { id: 'all', name: '全部', sortOrder: 0, isDefault: true },
  { id: 'hot', name: '热菜', sortOrder: 1, isDefault: true },
  { id: 'cold', name: '凉菜', sortOrder: 2, isDefault: true },
  { id: 'staple', name: '主食', sortOrder: 3, isDefault: true },
  { id: 'soup', name: '汤类', sortOrder: 4, isDefault: true },
  { id: 'dessert', name: '甜品', sortOrder: 5, isDefault: true },
  { id: 'drink', name: '饮品', sortOrder: 6, isDefault: true }
];

const recipes = [];
const favorites = [];
const searchHistory = [];

module.exports = {
  categories,
  recipes,
  favorites,
  searchHistory
};
