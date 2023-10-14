from flask import Flask, Response, render_template, jsonify, request
import cv2
import mediapipe as mp
import math
import pyautogui
from flask_cors import CORS

app = Flask(__name__)
CORS(app)




def generate_frames(mouse_control_active):
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(max_num_hands=1)  # Process only one hand for better performance

    click_threshold = 20

    # Scaling factors for faster mouse movement
    x_scaling = 1.5
    y_scaling = 2

    click_held = False
    screen_width, screen_height = pyautogui.size()

    # Skip frames for faster processing
    frame_counter = 0
    skip_frames = 2

    # Calculate the center of the screen
    center_x = screen_width // 2
    center_y = screen_height // 2

    # Set the initial position for the mouse cursor to the center of the screen
    pyautogui.moveTo(center_x, center_y)

    while True:
        if not mouse_control_active:
            continue

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

                pyautogui.moveTo(
                    screen_x - 500, screen_y - 1000, tween=pyautogui.linear
                )

                distance = math.sqrt((cx4 - cx8) ** 2 + (cy4 - cy8) ** 2)
                # print(distance)

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

        _, buffer = cv2.imencode(".jpg", frame)
        frame_bytes = buffer.tobytes()
        yield (
            b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n"
        )
        
    cap.release()

@app.route("/control_mouse", methods=["POST"])
def control_mouse():
    data = request.json
    if data["action"] == "start":
        return Response(
            generate_frames(True), mimetype="multipart/x-mixed-replace; boundary=frame"
        )
    elif data["action"] == "stop":
        cap.release()
        print("test")

    return jsonify({"status": "success"})


if __name__ == "__main__":
    cap = cv2.VideoCapture(0)
    app.run()
    cap.release()
