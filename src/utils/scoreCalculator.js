export function calcularPlacar(opcao) {
  const somaPros = opcao.pros.reduce((acc, item) => acc + item.peso, 0);
  const somaContras = opcao.contras.reduce((acc, item) => acc + item.peso, 0);
  return somaPros - somaContras;
}
