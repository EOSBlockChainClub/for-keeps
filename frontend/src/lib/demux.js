import {
  readers, watchers, // Don't need anything special, so let's use the base Action Watcher
} from 'demux-js';
import updaters from './updaters';
import ObjectActionHandler from './actionHandler';

const { NodeosActionReader } = readers.eos;
const { BaseActionWatcher } = watchers;
// Assuming you've already created a subclass of AbstractActionHandler

// Import Updaters and Effects, which are arrays of objects:
// [ { actionType:string, (updater|effect):function }, ... ] 
// const effects = require("./effects")

const actionHandler = new ObjectActionHandler(
  updaters, [],
  // effects,
)

const actionReader = new NodeosActionReader(
  "http://localhost:8888", // Locally hosted node needed for reasonable indexing speed
  0, // First actions relevant to this dapp happen at this block
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  250, // Poll at twice the block interval for less latency
)

actionWatcher.watch() // Start watch loop