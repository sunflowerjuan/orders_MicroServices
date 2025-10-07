import requests
import json
import socket
import time

def start_eureka_registration(app_name, eureka_host, eureka_port, instance_port, instance_host=None):
    if not instance_host:
        instance_host = socket.gethostname()

    eureka_url = f"http://{eureka_host}:{eureka_port}/eureka/apps/{app_name.upper()}"
    
    instance_data = {
        "instance": {
            "instanceId": f"{app_name}:{instance_host}:{instance_port}",
            "hostName": instance_host,  # 👈 forzado al nombre del contenedor
            "app": app_name.upper(),
            "ipAddr": instance_host,
            "status": "UP",
            "port": {"$": instance_port, "@enabled": "true"},
            "vipAddress": app_name,
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            },
            "homePageUrl": f"http://{instance_host}:{instance_port}/",
            "statusPageUrl": f"http://{instance_host}:{instance_port}/actuator/info",
            "healthCheckUrl": f"http://{instance_host}:{instance_port}/actuator/health",
        }
    }

    # Registro inicial
    while True:
        try:
            res = requests.post(eureka_url, json=instance_data)
            if res.status_code == 204:
                print(f"{app_name} registrado correctamente en Eureka")
                break
            else:
                print(f"⚠️ Error registrando {app_name}: {res.status_code} -> {res.text}")
        except Exception as e:
            print(f"No se pudo conectar a Eureka: {e}")
        time.sleep(5)

    # Heartbeat cada 30 segundos
    while True:
        try:
            hb_url = f"http://{eureka_host}:{eureka_port}/eureka/apps/{app_name.upper()}/{app_name}:{instance_host}:{instance_port}"
            requests.put(hb_url)
            print("💓 Heartbeat enviado")
        except Exception as e:
            print(f"⚠️ Error en heartbeat: {e}")
        time.sleep(30)
