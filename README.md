# Just another pomodoro timer.

Made using [Vue 3](https://vuejs.org/), [Pinia](), [vue-router](https://router.vuejs.org/), [tailwind](https://tailwindcss.com/)/[daisyui](https://daisyui.com/).

[Google Firebase](https://firebase.google.com/) uses here to store some settings and users tasks.

---

### start project:
```bash
git clone git@github.com:floster/hammertimer.git

cd hammertimer

bun install
bun run dev
```



#### note that you need to have [Firebase credentials](https://console.firebase.google.com/) in `.env`:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID_HERE
VITE_FIREBASE_APP_ID=YOUR_APP_ID_HERE
```
