// Design an Arduino-based system that creates a personalized comfort environment for an individual in a room using temperature, humidity, and user preferences. The system should predict comfort needs and adjust environment automatically.

// Requirements:

// Use a DHT22 sensor to continuously measure room temperature and humidity.

// Include a user input module (potentiometer, buttons, or keypad) to set a personal comfort preference (e.g., “Cool”, “Warm”, “Humidified”).

// The system should dynamically adjust multiple actuators based on both sensor readings and user preference:

// Fan (PWM) → adjusts airflow speed based on difference from preferred temperature.

// Humidifier / Dehumidifier (relay) → activates to reach preferred humidity range.

// Heater or AC simulation (LED/fan) → for extreme temperature deviations.

// Include predictive control logic: if temperature/humidity is trending away from the comfort zone, preemptively adjust actuators.

// Display live readings, user preference, and system status on an LCD or OLED display.

// Optionally, log comfort deviations and adjustments to an SD card for analysis.