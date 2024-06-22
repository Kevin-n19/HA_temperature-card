//https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/


/*
Variable for use this card.
type: custom:temperature-card
name: Salon
entity: sensor.air_housekeeper_humidite

//Option for this card
entity_unit: °C
entity_icon: mdi:temperature
battery_entity: null
battery_low_threshold: 11
update_threshold: 60
entity_high_level: 21
entity_low_level: 18
*/

import "https://unpkg.com/wired-card@0.8.1/wired-card.js?module";
import "https://unpkg.com/wired-toggle@0.8.0/wired-toggle.js?module";
import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

function loadCSS(url) {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

loadCSS("https://fonts.googleapis.com/css?family=Gloria+Hallelujah");

class TemperatureCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  render() {

    const entity = this.hass.states[this.config.entity];
  
      if (!entity) {
        return html`<div>Entity not found</div>`;
      }
       
      const battery = this.config.battery_entity ? this.hass.states[this.config.battery_entity] : null;
      const hasbattery = battery ? 'show' : 'hide';
      const batteryLevel = battery ? Math.round(battery.state) : '';
      const batteryLowThreshold = this.config.battery_low_threshold ;
      const batteryClass = batteryLevel < batteryLowThreshold ? 'battery-low' : '';
      
      const lastUpdated = new Date(entity.last_changed);
      const now = new Date();
      const diffInMinute = Math.floor((now - lastUpdated) / 1000 /60);
      const updateThreshold = this.config.update_threshold ;
      const updateClass = diffInMinute > updateThreshold ? 'update-stale' : '';
      let diff = `${diffInMinute} m`;
      if (diffInMinute < 2 ){
          diff = '  ';
      }
      else if (diffInMinute > 60) {
          let diffInHours = Math.floor(diffInMinute / 60);
          diff = `${diffInHours} H`;
      }
      
      var entityLevelColor = '';
      const Low_entityLevel = this.config.entity_low_level;
      const High_entityLevel = this.config.entity_high_level ; 
      if (entity.state > High_entityLevel) 
        {entityLevelColor = 'High_entityLevel';
           // console.log('High_entityLevel');
        }
      else if (entity.state < Low_entityLevel) 
        {entityLevelColor = 'Low_entityLevel';
          //  console.log('High_entityLevel');
        }
      
      const entity_unit = this.config.entity_unit ;
      const entity_icon = this.config.entity_icon ? this.config.entity_icon : 'mdi:thermometer';
        
      return html`
        <div class="update ${updateClass}" @click=${this._handleClick}><ha-icon icon="mdi:clock"></ha-icon>${diff}</div>
        <div class="icon ${entityLevelColor}" @click=${this._handleClick}><ha-icon icon="${entity_icon}"></ha-icon></div>
         ${hasbattery == 'show' ? html`<div class="battery ${batteryClass}" @click=${this._handleClick}><ha-icon icon="mdi:battery"></ha-icon>${batteryLevel}%</div>` : html``}
        <div class="temp" @click=${this._handleClick} >${entity.state} ${entity_unit}</div>
        <div class="name" @click=${this._handleClick} >${this.config.name}</div>
      `;
  }

  setConfig(config) {

    if (!config.entity) {
      throw new Error("You need to define entity");
    }

    this.config = {
        entity_unit: '°C',
        battery_low_threshold: 11,
        update_threshold: 60,
        entity_high_level: 22,
        entity_low_level: 18,
        ...config, // Remplacer par les valeurs fournies par l'utilisateur
    };
  }
  
  _handleClick() {
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId: this.config.entity },
    });
    this.dispatchEvent(event);
  }
  
  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 1;
  }

  _toggle(state) {
    this.hass.callService("homeassistant", "toggle", {
      entity_id: state.entity_id,
    });
  }

  static get styles() {
    return css`
  
	 :host {
	  background-color: var(--card-background-color, white);
	  display: grid;
	  grid-template-areas:"upd i bat" "a i b" "s s s" "n n n";			  
	  grid-template-columns: 25% 50% 25%;
	}

	.icon {
	  grid-area: i;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}

	.icon ha-icon {
	  --mdc-icon-size: 60px; 
	}
	
	.Low_entityLevel{
	    color: var(--blue-color, blue); 
	}
	
	.High_entityLevel{
	   color: var(--error-color, red); 
	}

	.battery {
	  grid-area: bat;
	  color: var(--primary-text-color, black);
	  font-size: x-small;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.battery ha-icon {
	  --mdc-icon-size: 15px;
	}
	
	.battery-low {
      color: var(--error-color, red);
    }
	
	.update{
	  grid-area: upd;
	  font-size: x-small;
	  color: var(--primary-text-color, black);
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.update ha-icon {
	  --mdc-icon-size: 15px; /* Use CSS variable to control icon size */
	}
	
	.update-stale {
      color: var(--error-color, red);
    }

	.temp {
	  grid-area: s;
	  font-size: 1.5em;
	  text-align: center;
	}

	.name {
	  grid-area: n;
	  font-size: 1.2em;
	  text-align: center;
	}
	`;
  }  
}
customElements.define("temperature-card", TemperatureCard);
