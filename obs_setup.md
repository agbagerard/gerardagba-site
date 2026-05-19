# OBS Studio Setup — n8n Tutorial Recordings

Opinionated checklist for clean 1080p screen recordings with voiceover, optimized for YouTube tutorials. ~30 min to configure once.

---

## 1. Output Settings  (`Settings → Output`)

Switch **Output Mode** to **Advanced**.

**Recording tab:**
- Type: **Standard**
- Recording Path: `C:\Users\agbag\Videos\OBS` (or similar — keep on a drive with 50+ GB free)
- Recording Format: **mkv** (crash-resilient; we'll remux to mp4 after)
- Audio Track: **Track 1** + **Track 2** (so mic and desktop can be edited separately)
- **Encoder:** check what your machine has:
  - Nvidia GPU → `NVENC H.264 (new)` ← fastest, cleanest
  - AMD GPU → `H.264/AVC (AMF)`
  - Intel iGPU → `QuickSync H.264`
  - None of the above → `x264` with preset **veryfast**
- Rate Control: **CBR**
- Bitrate: **15000 Kbps** (1080p) or **25000 Kbps** (1440p)
- Keyframe Interval: **2**
- Preset (NVENC only): **Quality** or **Max Quality**
- Profile: **high**
- Look-ahead: ON (if available)
- Psycho Visual Tuning: ON

## 2. Video Settings  (`Settings → Video`)

- Base (Canvas) Resolution: **1920 × 1080** (match your monitor; if 1440p monitor use 2560×1440)
- Output (Scaled) Resolution: **1920 × 1080**
- Downscale Filter: **Lanczos**
- FPS: **30** (use **60** only if CPU can keep up — n8n UI doesn't need 60)

## 3. Audio Settings  (`Settings → Audio`)

- Sample Rate: **48 kHz**
- Channels: **Stereo**
- Desktop Audio: your speakers/headphones (system sounds)
- Mic/Auxiliary: your actual microphone (USB or XLR + interface)

Right-click the **Mic** source in the mixer → **Filters** → add:
1. **Noise Suppression** → method **RNNoise** (best quality)
2. **Noise Gate** → Open -32 dB, Close -36 dB (cuts background hum)
3. **Compressor** → Ratio 4:1, Threshold -18 dB, Attack 6 ms, Release 60 ms
4. **Limiter** → Threshold -3 dB (prevents clipping)

Test by recording 30 seconds and playing back — no hum, no clipping, voice front-and-center.

---

## 4. Scenes  (left-bottom panel)

Create three scenes:

### Scene A — "Intro / Outro"
- Webcam source (Video Capture Device) at full canvas
- Optional: lower-third text or a static title card

### Scene B — "Screen Only"
- Display Capture (whole monitor) — pick the monitor you'll demo on
- Or Window Capture if you want to record only the n8n browser tab

### Scene C — "Screen + Webcam (overlay)"
- Display Capture (full canvas)
- Webcam in lower-right corner: scale to ~280×210, position with 20 px margin
- Add a black outline (right-click webcam source → Filters → Stroke, 2px black)

---

## 5. Hotkeys  (`Settings → Hotkeys`)

- Start Recording: **F9**
- Stop Recording: **F10**
- Pause Recording: **F11**
- Switch to Scene B: **F2**
- Switch to Scene C: **F3**
- Switch to Scene A: **F1**

(Pick whatever works — having them avoids alt-tabbing to OBS mid-recording.)

---

## 6. Cursor & Clicks (high-impact polish)

OBS doesn't natively highlight clicks. Two options:

**A. Free Windows tool:** Install **[Mousemaster](https://github.com/petoju/mousemaster)** or **Pointer Focus** trial. Set a circle around the cursor (yellow, 60% opacity) and click ripples. Records natively.

**B. Add in post:** Use **Mouse Highlight** filter in DaVinci Resolve or Premiere. More work but more control.

For tutorials, A is enough.

---

## 7. Recording Workflow  (each session)

1. Close everything except: n8n browser tab, terminal, OBS
2. Clear browser cache or use a clean profile (no notifications during recording)
3. Disable Slack/Discord/email notifications
4. Set monitor to "Do Not Disturb" mode (Windows: Focus Assist → Priority only)
5. Start with Scene A → hit F9 → say your intro
6. Switch to Scene C (F3) → demo
7. Stop with F10
8. The .mkv file is in your recording folder

---

## 8. Post-Recording

**Remux to mp4** (lossless, fast):
- OBS → File → **Remux Recordings** → drag the .mkv → click Remux
- Now you have an .mp4 ready for editing or direct upload

**Edit options:**
- **CapCut (free, easy):** good enough for tutorials, fast
- **DaVinci Resolve (free, pro):** steeper curve but professional output
- **No edit at all:** record one-take, upload as-is (acceptable for the first 5 episodes — speed > polish)

---

## 9. Quick A/V Sanity Check Before Each Recording

- [ ] Mic Filters active? (RNNoise indicator visible)
- [ ] Audio meters bouncing in green/yellow range when you talk
- [ ] No red clipping when you speak loudly
- [ ] Free disk space > 5 GB
- [ ] Notifications muted
- [ ] Phone on silent

---

## 10. Recommended Hardware Upgrades  (only if budget allows)

- USB condenser mic: **Shure MV7** ($249) or **Samson Q2U** ($70) — both dramatic upgrade over laptop mic
- Camera: any 1080p webcam → **Logitech C920** ($60) is fine for v1
- Lighting: a $25 ring light fixes 80% of "I look bad on camera" problems

You can ship Episode 01 with laptop mic + webcam, but viewers will notice. The USB mic is the highest-ROI upgrade.

---

## 11. First-Recording Test Plan (15 min, do before the real Episode 01)

1. Set up OBS following sections 1-5 above
2. Record a 60-second test: open n8n, click around, talk
3. Stop, remux to mp4, watch back
4. Check: voice clear? Cursor visible? Frame rate smooth? Any system sounds you forgot to mute?
5. Adjust whatever broke
6. Now you're ready to record the real Episode 01

---

## What ships with Episode 01 video

- 5-8 minutes total
- Voiceover (no need to show your face for v1)
- Shows: the pain (CSVs), the build (n8n workflow), the result (outputs)
- Ends with: "Free workflow JSON in description / agbagerard.com/episodes/multi-channel-sales-sync"

When you record, tell me and I'll write the YouTube description, tags, and the pinned comment that points to the lead magnet.
