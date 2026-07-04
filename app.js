const defaults = require('./defaultData');

const KEYS = {
  recipes: 'wawa_recipes',
  categories: 'wawa_categories',
  searchHistory: 'wawa_search_history',
  orderItems: 'wawa_order_items'
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function safeGet(key, fallback) {
  try {
    const value = wx.getStorageSync(key);
    return value === '' || value === undefined ? clone(fallback) : value;
  } catch (e) {
    wx.showToast({ title: '读取本地数据失败', icon: 'none' });
    return clone(fallback);
  }
}

function safeSet(key, value) {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (e) {
    wx.showToast({ title: '保存本地数据失败', icon: 'none' });
    return false;
  }
}

function initLocalData() {
  if (wx.getStorageSync(KEYS.categories) === '') {
    safeSet(KEYS.categories, clone(defaults.categories));
  }
  if (wx.getStorageSync(KEYS.recipes) === '') {
    safeSet(KEYS.recipes, []);
  }
  if (wx.getStorageSync(KEYS.searchHistory) === '') {
    safeSet(KEYS.searchHistory, []);
  }
  if (wx.getStorageSync(KEYS.orderItems) === '') {
    safeSet(KEYS.orderItems, []);
  }
}

function getRecipes() {
  return safeGet(KEYS.recipes, defaults.recipes);
}

function getRecipeById(id) {
  return getRecipes().find(item => item.id === id) || null;
}

function saveRecipe(recipe) {
  const recipes = getRecipes();
  const now = new Date().toISOString();
  const data = Object.assign({}, recipe, {
    id: recipe.id || String(Date.now()),
    isFavorite: !!recipe.isFavorite,
    createdAt: recipe.createdAt || now,
    updatedAt: now
  });
  recipes.unshift(data);
  return safeSet(KEYS.recipes, recipes) ? data : null;
}

function updateRecipe(id, patch) {
  const recipes = getRecipes();
  const index = recipes.findIndex(item => item.id === id);
  if (index < 0) return null;
  recipes[index] = Object.assign({}, recipes[index], patch, { updatedAt: new Date().toISOString() });
  return safeSet(KEYS.recipes, recipes) ? recipes[index] : null;
}

function deleteRecipe(id) {
  return safeSet(KEYS.recipes, getRecipes().filter(item => item.id !== id));
}

function toggleFavorite(id) {
  const recipe = getRecipeById(id);
  if (!recipe) return null;
  return updateRecipe(id, { isFavorite: !recipe.isFavorite });
}

function getOrderItems() {
  return safeGet(KEYS.orderItems, []);
}

function addOrderItem(id) {
  const recipe = getRecipeById(id);
  if (!recipe) return { ok: false, message: '菜谱不存在' };
  const items = getOrderItems();
  const found = items.find(item => item.recipeId === id);
  if (found) {
    found.count += 1;
  } else {
    items.unshift({ recipeId: id, count: 1, createdAt: new Date().toISOString() });
  }
  return { ok: safeSet(KEYS.orderItems, items) };
}

function updateOrderItem(id, count) {
  const next = getOrderItems()
    .map(item => item.recipeId === id ? Object.assign({}, item, { count }) : item)
    .filter(item => item.count > 0);
  return safeSet(KEYS.orderItems, next);
}

function removeOrderItem(id) {
  return safeSet(KEYS.orderItems, getOrderItems().filter(item => item.recipeId !== id));
}

function clearOrderItems() {
  return safeSet(KEYS.orderItems, []);
}

function getCategories() {
  return safeGet(KEYS.categories, defaults.categories).sort((a, b) => a.sortOrder - b.sortOrder);
}

function saveCategory(name) {
  const categories = getCategories();
  const clean = String(name || '').trim();
  if (!clean) return { ok: false, message: '分类名称不能为空' };
  if (categories.some(item => item.name === clean)) return { ok: false, message: '分类名称不能重复' };
  categories.push({ id: 'cat_' + Date.now(), name: clean, sortOrder: categories.length, isDefault: false });
  return { ok: safeSet(KEYS.categories, categories) };
}

function updateCategory(id, name) {
  const categories = getCategories();
  const clean = String(name || '').trim();
  if (!clean) return { ok: false, message: '分类名称不能为空' };
  if (categories.some(item => item.id !== id && item.name === clean)) return { ok: false, message: '分类名称不能重复' };
  const target = categories.find(item => item.id === id);
  if (!target) return { ok: false, message: '分类不存在' };
  target.name = clean;
  return { ok: safeSet(KEYS.categories, categories) };
}

function deleteCategory(id) {
  if (id === 'all') return { ok: false, message: '全部分类不能删除' };
  const categories = getCategories().filter(item => item.id !== id).map((item, index) => Object.assign(item, { sortOrder: index }));
  const recipes = getRecipes().map(item => item.categoryId === id ? Object.assign(item, { categoryId: 'all' }) : item);
  return { ok: safeSet(KEYS.categories, categories) && safeSet(KEYS.recipes, recipes) };
}

function reorderCategories(categories) {
  const sorted = categories.map((item, index) => Object.assign({}, item, { sortOrder: index }));
  return safeSet(KEYS.categories, sorted);
}

function searchRecipes(keyword) {
  const clean = String(keyword || '').trim().toLowerCase();
  if (!clean) return [];
  return getRecipes().filter(item => {
    return [item.title, item.description, (item.tags || []).join(' ')].join(' ').toLowerCase().includes(clean);
  });
}

function getSearchHistory() {
  return safeGet(KEYS.searchHistory, defaults.searchHistory);
}

function saveSearchHistory(keyword) {
  const clean = String(keyword || '').trim();
  if (!clean) return getSearchHistory();
  const next = [clean].concat(getSearchHistory().filter(item => item !== clean)).slice(0, 10);
  safeSet(KEYS.searchHistory, next);
  return next;
}

function clearSearchHistory(keyword) {
  const next = keyword ? getSearchHistory().filter(item => item !== keyword) : [];
  safeSet(KEYS.searchHistory, next);
  return next;
}

function resetLocalData() {
  return safeSet(KEYS.recipes, []) &&
    safeSet(KEYS.categories, clone(defaults.categories)) &&
    safeSet(KEYS.searchHistory, []) &&
    safeSet(KEYS.orderItems, []);
}

module.exports = {
  initLocalData,
  getRecipes,
  getRecipeById,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  getOrderItems,
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
  clearOrderItems,
  getCategories,
  saveCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  searchRecipes,
  getSearchHistory,
  saveSearchHistory,
  clearSearchHistory,
  resetLocalData
};
