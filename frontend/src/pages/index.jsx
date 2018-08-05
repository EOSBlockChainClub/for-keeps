import React, { Component, Fragment } from 'react';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs
import Instascan from 'instascan';
// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import logo from '../for_keeps_logo_720.png';
import page1 from '../Keep_page1.jpg';
import page2 from '../Keeps-Page2.jpg';
import coin from '../Keepcoin.png';
// import foo from '../lib/demux';
// NEVER store private keys in any source code in your real life development
// This is for demo purposes only!
const accounts = [
  {"name":"useraaaaaaaa", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"useraaaaaaab", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
  {"name":"useraaaaaaac", "privateKey":"5K2jun7wohStgiCDSDYjk3eteRH1KaxUQsZTEmTGPH4GS9vVFb7", "publicKey":"EOS5yd9aufDv7MqMquGcQdD6Bfmv6umqSuh9ru3kheDBqbi6vtJ58"},
  {"name":"useraaaaaaad", "privateKey":"5KNm1BgaopP9n5NqJDo9rbr49zJFWJTMJheLoLM5b7gjdhqAwCx", "publicKey":"EOS8LoJJUU3dhiFyJ5HmsMiAuNLGc6HMkxF4Etx6pxLRG7FU89x6X"},
  {"name":"useraaaaaaae", "privateKey":"5KE2UNPCZX5QepKcLpLXVCLdAw7dBfJFJnuCHhXUf61hPRMtUZg", "publicKey":"EOS7XPiPuL3jbgpfS3FFmjtXK62Th9n2WZdvJb6XLygAghfx1W7Nb"},
  {"name":"useraaaaaaaf", "privateKey":"5KaqYiQzKsXXXxVvrG8Q3ECZdQAj2hNcvCgGEubRvvq7CU3LySK", "publicKey":"EOS5btzHW33f9zbhkwjJTYsoyRzXUNstx1Da9X2nTzk8BQztxoP3H"},
  {"name":"useraaaaaaag", "privateKey":"5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo", "publicKey":"EOS8Du668rSVDE3KkmhwKkmAyxdBd73B51FKE7SjkKe5YERBULMrw"}
];



// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    margin: 20,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: "100%",
  },
  pre: {
    background: "#ccc",
    padding: 10,
    marginBottom: 0.
  },
  header: {
    height: '100px',
    textAlign: 'center',
    borderBottom: '2px solid midnightblue',
    marginBottom: '10px',
    backgroundColor: 'aliceblue',
  },
  logo: {
    height: '100px',
  },
  video: {
    display: 'flex',
    justifyContent: 'center',
  },
  screenContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  screen: {
    width: '360px',
    height: '640px',
    position: 'relative',
    overflow: 'hidden',
  },
  screenImg: {
    width: '100%',
  },
  notification: {
    position: 'absolute',
    top: '590px',
    transition: 'top 1s',
  },
  visibleNotification: {
    top: '410px',
  },
  notificationArc: {
    backgroundColor: '#91E2E1',
    width: '360px',
    height: '50px',
    borderRadius: '70% / 100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  notificationSquare: {
    backgroundColor: '#91E2E1',
    width: '320px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 20px',
  },
  cupClickHandler: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    position: 'absolute',
    top: '58px',
    right: '25px',
    cursor: 'pointer',
  },
  yourCof: {
    width: '150px',
    color: '#19A7AC',
    position: 'absolute',
    top: '227px',
    font: '18px Arial',
    textAlign: 'center',
    right: '99px',
  },
  yourCompCof: {
    top: '358px',
    font: '12px Arial',
    width: '150px',
    right: '69px',
    position: 'absolute',
    textAlign: 'left',
    color: 'white',
  },
  coin: {
    width: '70px',
    height: '70px',
  },
  congrats: {
    font: '18px Arial',
    color: 'black',
  },
  newBalance: {
    font: '14px Arial',
    color: 'black',
  }
});

const cafePrivateKey = '5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N';

// Index component

class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      noteTable: [],
      view: 'camera', // to store the table rows from smart contract
      visibleNotification: false,
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
    this.startCamera = this.startCamera.bind(this);
    this.gotoGraphs = this.gotoGraphs.bind(this);
  }

  componentDidMount() {
    const eos = Eos();
    eos.getCurrencyBalance('eosio.tokenz', 'useraaaaaaaa', 'COF').then(([res]) => {
      const [amountStr, currency] = res.split(' ');
      const amount = parseFloat(amountStr);
      this.setState({
        useraaaaaaaa: amount,
      });
    });
    this.startCamera();
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent(event) {
    // stop default behaviour
    event.preventDefault();

    // collect form data
    let account = event.target.account.value;
    let privateKey = event.target.privateKey.value;
    let note = event.target.note.value;

    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    switch (event.type) {
      case "submit":
        actionName = "update";
        actionData = {
          _user: account,
          _note: note,
        };
        break;
      default:
        return;
    }

    // eosjs function call: connect to the blockchain
    const eos = Eos({keyProvider: privateKey});
    const result = await eos.transaction({
      actions: [
        {
          account: "notechainac",
          name: actionName,
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: actionData,
        },
        {
          account: "notechainac",
          name: "like",
          authorization: [{
            actor: account,
            permission: 'active',
          }],
          data: {
            _noteId: 0,
          },
        }
      ],
    });

    console.log(result);
    this.getTable();
  }

  startCamera() {
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    const self = this;
    scanner.addListener('scan', function (content) {
      const eos = Eos({ keyProvider: cafePrivateKey });
      console.log('transacting...');
      eos.transaction({
        actions: [
          {
            account: "eosio.tokenz",
            name: 'transfer',
            authorization: [{
              actor: "cafe",
              permission: "active",
            }],
            data: {
              from: 'cafe',
              to: content,
              quantity: '1.0000 COF',
              memo: 'for keeps!',              
            },
          }
        ]
      });
      self.setState({
        view: 'account',
      });
      setTimeout(() => {
        const eos = Eos();
        eos.getCurrencyBalance('eosio.tokenz', 'useraaaaaaaa', 'COF').then(([res]) => {
          const [amountStr, currency] = res.split(' ');
          const amount = parseFloat(amountStr);
          self.setState({
            useraaaaaaaa: amount,
            visibleNotification: true,
          });
          setTimeout(() => {
            self.setState({
              visibleNotification: false,
            });
          }, 3500);
        });
      }, 1000);
      scanner.stop()
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        console.log(cameras);
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  gotoGraphs() {
    this.setState({
      view: 'graphs',
    });
  }

  render() {
    const { view, useraaaaaaaa, visibleNotification } = this.state;
    const { classes } = this.props;
    let notificationClasses = classes.notification;
    if (visibleNotification) {
      notificationClasses += ` ${classes.visibleNotification}`;
    }

    return (
      <div>
        { view === 'camera' &&
          <div>
            <div className={classes.header}>
              <img onClick={this.startCamera} className={classes.logo} src={logo} />
            </div>
            <div className={classes.video}>
              <video id="preview" />
            </div>
          </div>
      }
        {/* { view === 'account' &&  */}
          <div style={{ display: view === 'account' ? 'flex' : 'none'}} className={classes.screenContainer}>
            <div className={classes.screen}>
              <img className={classes.screenImg} src={page1} />
              <div onClick={this.gotoGraphs} className={classes.cupClickHandler} />
              <div className={classes.yourCompCof}>{useraaaaaaaa} COF</div>
              <div className={classes.yourCof}>{useraaaaaaaa} COF</div>
              <div className={notificationClasses}>
                <div className={classes.notificationArc} />
                <div className={classes.notificationSquare}>
                  <img className={classes.coin} src={coin} />
                  <p className={classes.congrats}>
                    Congrats, you’ve earned a COF token!
                  </p>
                  <p className={classes.newBalance}>
                    You now have {useraaaaaaaa} COF tokens!
                  </p>
                </div>
              </div>
            </div>
          </div>
        {/* } */}
        {/* { */}
          {/* view === 'graphs' && */}
        <div style={{ display: view === 'graphs' ? 'flex' : 'none' }} className={classes.screenContainer}>
            <div className={classes.screen}>
              <img className={classes.screenImg} src={page2} />
            </div>
          </div>
        {/* } */}
      </div>
    );
  }

}

export default withStyles(styles)(Index);
