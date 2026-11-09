import { test, expect } from '@playwright/test';

test.describe('Testes E2E - E-commerce Havan', () => {

  test.beforeEach(async ({ page }) => {
    await page.setDefaultTimeout(20000);
    await page.goto('https://www.havan.com.br/', { waitUntil: 'domcontentloaded' });
  });

  test('CT01 - Pesquisar produto e adicionar ao carrinho', async ({ page }) => {
    const termoBusca = 'Fritadeira';

    // Seletor mais abrangente para o campo de busca
    const campoBusca = page.locator('input[name="q"], input[type="search"], input[placeholder*="procura" i], input[id*="search" i]').first();
    await expect(campoBusca).toBeVisible();
    await campoBusca.fill(termoBusca);
    await campoBusca.press('Enter');

    // Valida se a URL ou a página respondeu à busca
    await expect(page).toHaveURL(/busca|search|fritadeira/i);

    // Clica no primeiro produto retornado na listagem
    const primeiroProduto = page.locator('article, .product-item, a[class*="product"], [class*="shelf"] a').first();
    await expect(primeiroProduto).toBeVisible();
    await primeiroProduto.click();

    // Clica no botão de compra
    const botaoAdicionar = page.getByRole('button', { name: /comprar|adicionar ao carrinho/i }).first();
    await expect(botaoAdicionar).toBeVisible();
    await botaoAdicionar.click();

    // Valida se o resumo ou gaveta do carrinho apareceu
    const resumoCarrinho = page.locator('[data-testid="cart"], .cart-sidebar, #cart-drawer, [class*="cart"]').first();
    await expect(resumoCarrinho).toBeVisible();
  });

  test('CT02 - Buscar por produto inexistente e exibir mensagem de aviso', async ({ page }) => {
    const termoInvalido = 'ProdutoInexistenteXyz123';

    const campoBusca = page.locator('input[name="q"], input[type="search"], input[placeholder*="procura" i], input[id*="search" i]').first();
    await expect(campoBusca).toBeVisible();
    await campoBusca.fill(termoInvalido);
    await campoBusca.press('Enter');

    const mensagemSemResultado = page.getByText(/nenhum resultado|não encontramos|sem resultados/i);
    await expect(mensagemSemResultado.first()).toBeVisible();
  });

test('CT03 - Navegar por uma categoria do menu principal', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });

    const menuCategoria = page.locator('header a, nav a').filter({ hasText: /ofertas|eletro|casa/i }).first();
    await menuCategoria.scrollIntoViewIfNeeded();
    await expect(menuCategoria).toBeVisible();
    await menuCategoria.evaluate((node: HTMLElement) => node.click());

    // Valida se a URL foi alterada corretamente para a página de destino
    await expect(page).toHaveURL(/ofertas|categoria|eletro|casa/i);
  });
});