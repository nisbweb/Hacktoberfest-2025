// Design an Arduino-based system that simulates an adaptive cruise control feature, where a "car" (your system) adjusts its speed automatically based on the distance from the vehicle in front.

// Requirements:

// Use an ultrasonic sensor to continuously measure the distance from the object ahead (representing another car).

// Based on distance readings:

// > 100 cm → Car runs at full speed (PWM motor = 255).

// 50 cm – 100 cm → Car runs at medium speed (PWM motor = 150).

// 20 cm – 50 cm → Car runs at low speed (PWM motor = 80).

// < 20 cm → Car stops immediately (PWM motor = 0 + buzzer alert).

// Display current distance and simulated "speed" on an LCD or Serial Monitor.

// Include a manual override button to stop the car regardless of distance (safety).