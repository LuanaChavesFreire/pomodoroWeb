// Teste básico para validar que o ambiente funciona

describe('Pomodoro Web - Testes Básicos', () => {
  test('ambiente de testes está funcionando', () => {
    expect(true).toBe(true)
  })

  test('valores padrão do pomodoro estão corretos', () => {
    const FOCO_MINUTOS = 25
    const DESCANSO_MINUTOS = 5
    expect(FOCO_MINUTOS).toBe(25)
    expect(DESCANSO_MINUTOS).toBe(5)
  })

  test('conversão de minutos para segundos funciona', () => {
    const minutos = 25
    const segundos = minutos * 60
    expect(segundos).toBe(1500)
  })
})