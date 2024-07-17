document.addEventListener('DOMContentLoaded', () => {
    let button = document.getElementById('button');
    let timeLeft = 30;
    let countdownTimer;
    let scrollTimeout;
    let userHasScrolled = true;
  
    function startCountdown() {
      countdownTimer = setInterval(() => {
        if (document.hidden || !userHasScrolled) return;
  
        timeLeft--;
        button.textContent = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(countdownTimer);
          button.textContent = "Claim reward";
          button.disabled = false;
        }
      }, 1000);
    }
  
    function handleScroll() {
      userHasScrolled = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        userHasScrolled = false;
      }, 5000);
  
      if (!countdownTimer && timeLeft > 0) {
        startCountdown();
      }
    }
  
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && timeLeft > 0) {
        if (!countdownTimer) {
          startCountdown();
        }
      } else {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    });
  
    window.addEventListener('focus', () => {
      if (!countdownTimer && timeLeft > 0) {
        startCountdown();
      }
    });
  
    window.addEventListener('blur', () => {
      clearInterval(countdownTimer);
      countdownTimer = null;
    });
  
    window.addEventListener('scroll', handleScroll);
  
    handleScroll(); // Initialize scroll detection
  });
  