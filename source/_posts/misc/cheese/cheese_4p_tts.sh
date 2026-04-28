#!/usr/bin/env bash
set -euo pipefail

# 你在 `say -v '?' | grep -i zh` 里看到的中文语音名（改这里）
VOICE="Tingting"

# 语速（每分钟词数；160~200 通常比较“适中”）
RATE=145

# 倒计时节拍：每个数字后插入的静音（毫秒）
# 如果你希望更接近“每秒一个数字”的节奏，把它设为 900~1050 自己听着微调
PAUSE_MS=900

countdown() {
  # 用中文数字更自然；你也可以改成 10 9 8 ...
  local digits=("ten" "nine" "eight" "seven" "six" "five" "four" "three" "two" "one")
  local s=""
  for d in "${digits[@]}"; do
    s+="${d}[[slnc ${PAUSE_MS}]]"
  done
  echo "$s"
}

segment() {
  local hour="$1"
  cat <<EOF
现在${hour}点了。[[slnc 600]]请摇到[[slnc 100]]${hour}点钟的玩家[[slnc 300]]睁开眼睛和行动。请奶酪大盗，[[slnc 300]]盗走中间的奶酪。[[slnc 400]]
$(countdown)
请老鼠们闭上眼睛。[[slnc 400]]
EOF
}

TEXT=$(cat <<EOF
请所有老鼠[[slnc 200]]闭上眼睛，[[slnc 400]]大家不能看[[slnc 100]]别人的点数。[[slnc 400]]
$(segment 1)
$(segment 2)
$(segment 3)
$(segment 4)
$(segment 5)
$(segment 6)
天亮了，请所有老鼠[[slnc 100]]整理表情[[slnc 300]]睁开眼睛，奶酪[[slnc 300]]被偷走了。[[slnc 400]]
现在大家开始计时，[[slnc 300]]来推理一下[[slnc 200]]谁[[slnc 200]]是我们的奶酪大盗吧。
EOF
)

OUT_AIFF="cheese_thief_4p_host.aiff"

# 生成 AIFF（无损，最稳）
say -v "$VOICE" -r "$RATE" -o "$OUT_AIFF" "$TEXT"

echo "Done:"
echo "  AIFF: $OUT_AIFF"
