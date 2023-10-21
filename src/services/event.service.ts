import { ProductData } from "types";



class EventService {

  private async _sendEventAnalitics(eventAnalitics: unknown) {
    console.log(eventAnalitics);
    
    try {

      const response = await fetch('/api/sendEvent', {
        method: 'POST',
        body: JSON.stringify(eventAnalitics),
      })

      const result = await response.json()
      console.log('Success', result);
      
    } catch(e) {
      console.log('Error', e);
    }
  }

  async routeEvent (url: string) {

    const eventAnalitics = {
      type: 'route', 
      payload: {
        url
      },
      timestamp: Date.now()
    }
    this._sendEventAnalitics(eventAnalitics)
    
  }

  async viewCardEvent(productProps: ProductData, secretKey: string) {

    const eventAnalitics = {
      type: productProps.log ? 'viewCardPromo' : 'viewCard',
      payload: {
        productProps,
        secretKey
      },
      timestamp: Date.now()
    }
    this._sendEventAnalitics(eventAnalitics)
  }

  async addToCardEvent(productProps: ProductData) {
    const eventAnalitics = {
      type: 'addToCard',
      payload: {
        productProps
      },
      timestamp: Date.now()
    }
    this._sendEventAnalitics(eventAnalitics)
  }

  async purchaseEvent(orderId: number, totalPrice: number, productIds: number[]) {
    const eventAnalitics = {
      type: 'addToCard',
      payload: {
        orderId,
        totalPrice,
        productIds
      },
      timestamp: Date.now()
    }
    this._sendEventAnalitics(eventAnalitics)
    
  }
}
export const eventService = new EventService();