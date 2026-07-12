import { test, expect } from '@playwright/test';

test('a página carrega com sucesso e contém o conteúdo principal', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/');
  await expect(page).toHaveTitle(/Pedro Moreira Taekwondo/i);
  await expect(page.getByRole('heading', { name: /conquiste mais que/i })).toBeVisible();
  await expect(page.locator('text=Agendar aula experimental gratuita')).toBeVisible();
});

test('a página possui metadados básicos de SEO e semântica', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /taekwondo|aula|academia/i);
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', /width=device-width/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /127.0.0.1:8000\//i);
});

test('o formulário de contato abre e fecha corretamente', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/');
  await page.locator('button[data-book]').first().click();
  await expect(page.locator('.modal-backdrop.active')).toBeVisible();
  await page.locator('[data-close-modal]').first().click();
  await expect(page.locator('.modal-backdrop.active')).toHaveCount(0);
});
