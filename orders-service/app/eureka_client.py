import requests
import socket
import time

def start_eureka_registration(app_name, eureka_host, eureka_port, instance_port):
    instance_id = f"{app_name}:{socket.gethostname()}:{instance_port}"
    eureka_base = f"http://{eureka_host}:{eureka_port}/eureka/apps/{app_name.upper()}"
    register_url = eureka_base
    heartbeat_url = f"{eureka_base}/{instance_id}"

    data = {
        "instance": {
            "instanceId": instance_id,
            "hostName": socket.gethostname(),
            "app": app_name.upper(),
            "ipAddr": socket.gethostbyname(socket.gethostname()),
            "status": "UP",
            "port": {"$": instance_port, "@enabled": "true"},
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            }
        }
    }

    # --- Registro inicial ---
    while True:
        try:
            res = requests.post(register_url, json=data)
            if res.status_code in (204, 200):
                print(f"[EUREKA] {app_name} registrado correctamente en {register_url}")
                break
            else:
                print(f"[EUREKA] Error registrando ({res.status_code}) -> {res.text}")
        except Exception as e:
            print(f"[EUREKA] Esperando a Eureka... ({e})")
        time.sleep(5)

    # --- Heartbeat periódico ---
    while True:
        try:
            res = requests.put(heartbeat_url)
            if res.status_code == 200:
                print(f"[EUREKA] Heartbeat enviado ✓ ({app_name})")
            else:
                print(f"[EUREKA] Error heartbeat ({res.status_code}) -> {res.text}")
        except Exception as e:
            print(f"[EUREKA] Fallo heartbeat ({e})")
        time.sleep(30)  # cada 30 segundos
