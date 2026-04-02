const userInput = document.getElementById('userInput');
const vibeSelect = document.getElementById('vibe');
const aiResponse = document.getElementById('aiResponse');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('journalForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const entry = userInput.value.trim();
  const vibe = vibeSelect.value.trim();

  if (!entry || !vibe) {
    show('Please fill in both your journal entry and your vibe.');
    return;
  }

  submitBtn.disabled = true;
  show('Thinking...');

  const response = await fetch('/api/journal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInput: entry, vibe }),
  });

  const data = await response.json();
  submitBtn.disabled = false;

  if (!response.ok) {
    show(`Error: ${data.error}`);
    return;
  }

  show(data.response);
});

function show(text) {
  aiResponse.textContent = text;
  aiResponse.classList.add('visible');
}
