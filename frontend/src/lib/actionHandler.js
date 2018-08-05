import { handlers } from 'demux-js';
const { AbstractActionHandler } = handlers;
const state = { volumeBySymbol: {}, totalTransfers: 0, indexState: { blockNumber: 0, blockHash: "" } } // Initial state
console.log(AbstractActionHandler);
class ObjectActionHandler {
  async handleWithState(handle) {
    await handle(state)
  }

  async loadIndexState() {
    return state.indexState
  }

  async updateIndexState(stateObj, block) {
    stateObj.indexState.blockNumber = block.blockNumber
    stateObj.indexState.blockHash = block.blockHash
  }
}
Object.setPrototypeOf(ObjectActionHandler, AbstractActionHandler);
export default ObjectActionHandler;
