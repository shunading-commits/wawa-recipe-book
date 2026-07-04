function parseRecipeUrl(url) {
  const clean = String(url || '').trim();
  if (!/^https?:\/\//.test(clean)) {
    return { success: false, message: '请输入正确的链接' };
  }
  // 模拟解析，不抓取网页，也不自动保存。
  return {
    success: true,
    data: {
      title: '',
      description: '从链接解析出的信息需要你确认后再保存。',
      coverImage: '',
      categoryId: 'all',
      cookingTime: '',
      difficulty: '简单',
      servings: '',
      ingredients: [{ id: 'ing_' + Date.now(), name: '', amount: '' }],
      steps: [{ id: 'step_' + Date.now(), order: 1, description: '', image: '' }],
      tips: '部分网站可能无法自动解析，你可以手动补充菜谱信息。',
      tags: [],
      sourceUrl: clean,
      sourceType: 'url'
    }
  };
}

module.exports = {
  parseRecipeUrl
};
