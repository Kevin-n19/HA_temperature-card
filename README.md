# HA_temperature-card
A custom temperature card for Home Assistant to display temperature or humidity, battery levels and last updatre.


![image](https://github.com/Kevin-n19/HA_temperature-card/assets/120246712/d3a1fba3-a57e-43a5-af73-7526ad52000f)
![image](https://github.com/Kevin-n19/HA_temperature-card/assets/120246712/25a33d16-c3ca-4503-ac35-bb2b380cbd55)




## Installation

### Manual Installation

1. Download the `temperature-card.js` file from the [latest release](https://github.com/Kevin-n19/HA_temperature-card.git).
2. Place the file in your `config/www` folder.

## Use card in dashboard

### Add ressources
![image](https://github.com/Kevin-n19/HA_temperature-card/assets/120246712/b85f66ac-0d96-47f8-abe5-f6441a2dd8b2)
![image](https://github.com/Kevin-n19/HA_temperature-card/assets/120246712/ac2be527-a12e-4b0e-ac8b-a1691794b24e)

#### In YAML
```yaml
resources:
  - url: /local/temperature-card.js
    type: module
```

## Add card in dashboard

Add a custom button-card to your dashboard.
Some values has default value. battery_entity is optional. 

![image](https://github.com/Kevin-n19/HA_temperature-card/assets/120246712/79e98117-18b6-43dc-8ab2-c4dc205a011c)
![image](https://github.com/Kevin-n19/HA_temperature-card/assets/120246712/ff7e8dd6-c9dd-4ecd-83db-58d3ed7cfa8c)

- name (Required): The name to be displayed on the card.
- entity (Required): The entity ID of the temperature sensor.
- entity_unit (Optional): The unit of measurement to display (default: '°C').
- entity_icon (Optional): The icon to display (default: 'mdi:temperature').
- battery_entity (Optional): The entity ID of the battery sensor.
- battery_low_threshold (Optional): The battery level at which to show a low battery warning (default: 11%).
- update_threshold (Optional): The threshold in minutes for showing the last update time (default: 60min).
- entity_high_level (Optional): The high level threshold for the entity value (default: 22).
- entity_low_level (Optional): The low level threshold for the entity value (default: 18).

```yaml
type: custom:temperature-card
name: Living Room
entity: sensor.living_room_humidity
entity_unit: '%'
entity_icon: 'mdi:water-percent'
entity_high_level: 80
entity_low_level: 60
update_threshold: 20
battery_entity: sensor.living_room_battery
battery_low_threshold: 5
```
