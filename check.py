from gpiozero import LED
import psutil
from time import sleep
from datetime import datetime

led_green = LED(20)
led_yellow = LED(21)
led_red = LED(22)

file=open("log_cpu.txt", "a")
while True:
    # Get CPU usage
    cpu_usage = psutil.cpu_percent(interval=5, percpu=True)
    cpu_usage_mean = sum([i / len(cpu_usage) for i in cpu_usage])
    cpu_usage_mean = round(cpu_usage_mean, 3)
    print(f"cpu usage(%) : {cpu_usage_mean}%")

    # Control LEDs based on CPU usage
    if cpu_usage_mean < 50: # Usage less than 50%
        led_green.on()
        led_red.off()
        led_yellow.off()
        print("LED: Green")
    elif 80 > cpu_usage_mean > 50: # Usage over 50 and less than 80
        led_green.off()
        led_red.off()
        led_yellow.on()
        print("LED: Yellow") 
    else: # Usage 80% or more
        led_green.off()
        led_red.on()
        led_yellow.off()
        print("LED: Red")
    
    data = f"{datetime.now().strftime('%Y/%m/%d %H:%M:%S')} " \
            f"cpu usage(%) : {cpu_usage_mean}% \n"
    file.write(data)

    sleep(5)  # Wait for 5 seconds before the next reading
file.close()