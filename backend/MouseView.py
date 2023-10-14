import cv2
import mediapipe as mp
import math
import pyautogui

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)  # Process only one hand for better performance

click_held = False
click_threshold = 20

screen_width, screen_height = pyautogui.size()

screen_width, screen_height = pyautogui.size()

# Calculate the center of the screen
center_x = screen_width // 2
center_y = screen_height // 2

# Set the initial position for the mouse cursor to the center of the screen
pyautogui.moveTo(center_x, center_y)

cap = cv2.VideoCapture(0)

# Skip frames for faster processing
skip_frames = 3
frame_counter = 0

# Scaling factors for faster mouse movement
x_scaling = 1.3
y_scaling = 1.3

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame_counter += 1
    if frame_counter % skip_frames != 0:
        continue

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_frame)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            landmark_4 = hand_landmarks.landmark[4]
            landmark_8 = hand_landmarks.landmark[8]  # Index finger tip

            cx4, cy4 = int(landmark_4.x * frame.shape[1]), int(
                landmark_4.y * frame.shape[0]
            )

            cx8, cy8 = int(landmark_8.x * frame.shape[1]), int(
                landmark_8.y * frame.shape[0]
            )

            mirrored_x = frame.shape[1] - cx8

            screen_x = int(mirrored_x * (screen_width / frame.shape[1]) * x_scaling)
            screen_y = int(cy8 * (screen_height / frame.shape[0]) * y_scaling)

            pyautogui.moveTo(screen_x, screen_y)

            distance = math.sqrt((cx4 - cx8) ** 2 + (cy4 - cy8) ** 2)

            if distance < click_threshold:
                if not click_held:
                    pyautogui.mouseDown(button="left")
                    print("Fingers Pinched")
                    click_held = True
            else:
                if click_held:
                    pyautogui.mouseUp(button="left")
                    print("Fingers Unpinched")
                    click_held = False

    else:
        if click_held:
            pyautogui.mouseUp(button="left")
            click_held = False

cap.release()
