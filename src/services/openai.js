export async function obterResumoComparacao(comparacao) {
  const prompt = gerarPrompt(comparacao);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente especialista em análise comparativa." },
        { role: "user", content: prompt }
      ],
      max_tokens: 400,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na OpenAI: ${response.statusText}`);
  }

  const data = await response.json();
  const texto = data.choices[0].message.content;

  try {
    return JSON.parse(texto);
  } catch (err) {
    console.error("Erro ao parsear JSON do ChatGPT:", err);
    return { vencedor: null, motivos: {} };
  }
}

function gerarPrompt(comparacao) {
  let prompt = `Você é um assistente que ajuda a escolher a melhor opção com base nas opções fornecidas. Aqui estão as opções:\n\n`;

  comparacao.opcoes.forEach((op, i) => {
    prompt += `Opção ${i + 1}: ${op.nome}\n`;
  });

  prompt += `
Agora, responda SOMENTE um JSON com essa estrutura EXATA:
{
  "vencedor": "nome da opção que você acha melhor",
  "motivos": {
    "nome da opção 1": "explicação breve para essa opção, citando argumentos e motivos para escolher ou não essa opção",
    "nome da opção 2": "explicação breve para essa opção, citando argumentos e motivos para escolher ou não essa opção"
  }
}
Sua resposta deve conter o nome exato das opções e explicações objetivas, com no máximo 3 frases para cada.`;

  return prompt;
}

