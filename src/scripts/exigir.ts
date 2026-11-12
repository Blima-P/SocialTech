export function exigir<T extends Element = HTMLElement>(
  raiz: ParentNode,
  seletor: string,
): T {
  const elemento = raiz.querySelector<T>(seletor);
  if (!elemento) {
    throw new Error(`Elemento obrigatório não encontrado: ${seletor}`);
  }
  return elemento;
}
