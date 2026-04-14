// ====================== 只修改了这里：让current从-2开始，适配3页新增新闻页 ======================
let current = -2;
const total = 12;
const correct = { 3:3, 5:1, 7:2, 9:2 };
const tips = {
  3:"正确答案：焦油 → 香烟中最主要的致癌物质",
  5:"正确答案：血压心率恢复正常 → 戒烟20分钟身体就会启动修复",
  7:"正确答案：丢掉所有香烟 → 断绝源头是戒烟的第一步",
  9:"正确答案：立刻吸烟 → 烟瘾发作时要坚持忍耐，拒绝复吸"
};

function nextPage() {
  if(current >= total) return;
  if(current >= 1){
    document.getElementById(`page${current}`).classList.remove('active');
  } else if(current == 0){
    document.getElementById(`page0`).classList.remove('active');
  } else if(current == -1){
    document.getElementById(`page-1`).classList.remove('active');
  } else if(current == -2){
    document.getElementById(`page-2`).classList.remove('active');
  }

  current++;

  if(current >= 1){
    document.getElementById(`page${current}`).classList.add('active');
  } else if(current == 0){
    document.getElementById(`page0`).classList.add('active');
  } else if(current == -1){
    document.getElementById(`page-1`).classList.add('active');
  } else if(current == -2){
    document.getElementById(`page-2`).classList.add('active');
  }
}

// ====================== 下面所有代码，完全和你原来一模一样，没动任何一行 ======================
function prevPage() {
  if(current <=-2) return;
  document.getElementById(`page${current}`).classList.remove('active');
  current--;
  document.getElementById(`page${current}`).classList.add('active');
}
function check(page, ans) {
  if(ans === correct[page]) { nextPage(); }
  else {
    document.getElementById('modalText').innerText = tips[page];
    document.getElementById('modal').classList.add('show');
    document.getElementById('mask').classList.add('show');
  }
}
function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.getElementById('mask').classList.remove('show');
  nextPage();
}

function toggleDetail(stepId) {
  const detail = document.getElementById(stepId+'-detail');
  const chevron = document.getElementById(stepId+'-chevron');
  detail.classList.toggle('hidden');
  chevron.style.transform = detail.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}
const tipsList = ['🚀 每一分钟不吸烟，身体都在修复。','💪 戒烟20分钟，心率血压就开始下降。'];
const smallTipsList = ['💡 戒烟初期多喝水，每天至少8杯。','💡 无糖口香糖代替吸烟。'];
function showRandomTip() {
  const t = tipsList[Math.floor(Math.random()*tipsList.length)];
  const toast = document.getElementById('tipToast');
  toast.textContent = t; toast.classList.add('opacity-100');
  setTimeout(()=>toast.classList.remove('opacity-100'),2800);
}
function showSmallTip() {
  const t = smallTipsList[Math.floor(Math.random()*smallTipsList.length)];
  const toast = document.getElementById('tipToast');
  toast.textContent = t; toast.classList.add('opacity-100');
  setTimeout(()=>toast.classList.remove('opacity-100'),4000);
}

const bgMusic = document.getElementById('bgMusic');
const musicMask = document.getElementById('musicMask');
const musicModal = document.getElementById('musicModal');
const playIcon = document.getElementById('playIcon');
const audioWave = document.getElementById('audioWave');

function closeMusicModal() {
  musicMask.classList.remove('show');
  musicModal.classList.remove('show');
}

function playMusic() {
  bgMusic.volume = 0.7;
  bgMusic.currentTime = 20;
  bgMusic.play().then(() => {
    playIcon.textContent = '❚❚';
    audioWave.classList.remove('hidden');
    closeMusicModal();
  }).catch(err => { console.log('播放限制',err); closeMusicModal(); });
}

function togglePlayPause() {
  if (bgMusic.paused) {
    bgMusic.currentTime = 20;
    bgMusic.play().then(() => {
      playIcon.textContent = '❚❚';
      audioWave.classList.remove('hidden');
    });
  } else {
    bgMusic.pause();
    playIcon.textContent = '▶';
    audioWave.classList.add('hidden');
  }
}

function adjustVolume(value) { bgMusic.volume = value; }

document.addEventListener('wheel', e=>{ e.preventDefault(); e.deltaY>0 ? nextPage() : prevPage(); });
document.addEventListener('keydown', e=>{ if(e.key==='ArrowDown'||e.key===' ') nextPage(); if(e.key==='ArrowUp') prevPage(); });

function showEncouragement() {
  const encouragements = [
    "戒烟超酷的！🚀",
    "烟瘾退退退！🙅‍♂️",
    "健康值+10086✨",
    "离长寿又近一步～😜",
    "家人夸夸！🥰",
    "省下的钱能喝奶茶啦🥤",
    "You're awesome! 🎉",
    "No smoke, more happy! 😃",
    "Quit smoking like a boss! 💪",
    "禁煙、頑張れ！💨",
    "健康な体になるぞ！🍵",
    "금연 성공! 🎊",
    "건강한 삶 시작! ✨",
    "烟？达咩！🙅‍♀️",
    "这波血赚不亏！🤙",
    "戒烟王者非你莫属👑"
  ];

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const count = Math.floor(Math.random() * 8) + 5;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const text = document.createElement('div');
      text.textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
      const size = Math.floor(Math.random() * 8) + 14;
      const color = `hsl(${Math.floor(Math.random() * 360)}, 80%, 40%)`;
      const posX = Math.floor(Math.random() * 80) + 10;
      const delay = Math.random() * 3;
      const rotate = Math.floor(Math.random() * 20) - 10;

      text.style.position = 'absolute';
      text.style.left = `${posX}%`;
      text.style.bottom = '0';
      text.style.fontSize = `${size}px`;
      text.style.fontWeight = 'bold';
      text.style.color = color;
      text.style.opacity = '0';
      text.style.transform = `rotate(${rotate}deg) translateY(0)`;
      text.style.transition = `all ${1 + delay}s ease-out`;
      text.style.textShadow = '0 2px 4px rgba(0,0,0,0.2)';

      container.appendChild(text);

      setTimeout(() => {
        text.style.opacity = '1';
        text.style.bottom = `${Math.floor(Math.random() * 50) + 30}%`;
      }, 10);

      setTimeout(() => {
        text.style.opacity = '0';
        text.style.transform = `rotate(${rotate}deg) translateY(-20px)`;
        setTimeout(() => {
          text.remove();
          if (i === count - 1) {
            setTimeout(() => container.remove(), 1000);
          }
        }, 500);
      }, (1 + delay) * 1000);
    }, i * 150);
  }

  const toast = document.getElementById('tipToast');
  toast.textContent = "🎉 戒烟勇士，你超棒的！";
  toast.classList.add('opacity-100');
  setTimeout(() => toast.classList.remove('opacity-100'), 3000);
}

// ====================== 【仅新增】自动生成图标 ======================
window.addEventListener('DOMContentLoaded', () => {
  const icons = ['🚭','🚭','🚭','🚭','🚭','🥰','🙅‍♂️','🤙','✨','🕑','💪'];
  const grid = document.getElementById('iconGrid');
  if(!grid) return;
  for(let i=0;i<180;i++){
    const el = document.createElement('div');
    el.className = 'icon-grid__item';
    el.textContent = icons[Math.floor(Math.random()*icons.length)];
    grid.appendChild(el);
  }
});
