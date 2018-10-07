import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  });
  

class QuantFeedback extends Component {
  constructor() {
    super()
    this.state = { 
        feedback: {
            "timestamp": 1532093127,
            "contract_uri": "https://s3.amazonaws.com/qsp-protocol-test-contracts/abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol",
            "contract_hash": "90b555f2ef5327e1896001d87462e2e69da3daace18cb7b60f22312493a9c4f9",
            "requestor": "0x6B9aaa08aeA41eE4cED230cff1cc23e6710006f1",
            "auditor": "0x9bf5e4620Db5944BCCf0A1E6a6b72A430c5A0126",
            "request_id": 159,
            "version": "1.0",
            "audit_state": 4,
            "analyzers_reports": [
              {
                "analyzer": {
                  "name": "oyente",
                  "version": "16c74d21e997cffe9a7480cb140ee6c05b7ba608e1b878df90f585b4710e41b0",
                  "vulnerabilities_checked": [
                    "integer_underflow",
                    "integer_overflow",
                    "callstack",
                    "money_concurrency",
                    "time_dependency",
                    "reentrancy",
                    "parity_multisig_bug_2",
                    "assertion_failure"
                  ],
                  "command": "python /oyente/oyente/oyente.py -ce -j -s /shared/tmp4eqkpx7r"
                },
                "status": "success",
                "warnings": [
                  "root:You are using evm version 1.8.2. The supported version is 1.7.3",
                  "root:You are using solc version 0.4.21, The latest supported version is 0.4.19"
                ],
                "coverages": [
                  {
                    "percentage": 98.3,
                    "file": "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol",
                    "contract": "SendBalance"
                  }
                ],
                "potential_vulnerabilities": [
                  {
                    "name": "reentrancy",
                    "file": "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol",
                    "contract": "SendBalance",
                    "instances": [
                      {
                        "ref_id": 0,
                        "start_line": 15,
                        "end_line": 15
                      }
                    ]
                  }
                ],
                "count_potential_vulnerabilities": 1,
                "hash": "5a6540317a07769c1a3b665a2a42029042545d38093a081d86db51b7a05f4782",
                "start_time": 1532093121,
                "end_time": 1532093126
              },
              {
                "analyzer": {
                  "name": "mythril",
                  "version": "a4e01e358fc52517a1889fad415846876d27ad9e8f6555a59246b761a89ec882",
                  "vulnerabilities_checked": [
                    "call_data_forwarded",
                    "dependence_on_environment_variable",
                    "call_to_a_user-supplied_address",
                    "use_of_tx_origin",
                    "ether_send",
                    "exception_state",
                    "message_call_to_external_contract",
                    "state_change_after_external_call",
                    "integer_overflow",
                    "integer_underflow",
                    "multiple_calls",
                    "unchecked_suicide",
                    "transaction_order_dependence",
                    "unchecked_call_return_value"
                  ],
                  "command": "docker run -v \"/tmp/mythril/821\":/shared/ -i \"mythril/myth@sha256:a4e01e358fc52517a1889fad415846876d27ad9e8f6555a59246b761a89ec882\" -o json -x \"/shared/tmp4eqkpx7r\""
                },
                "status": "success",
                "potential_vulnerabilities": [
                  {
                    "name": "Ether send",
                    "type": "ether_send",
                    "file": "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol",
                    "description": "In the function `withdrawBalance()` a non-zero amount of Ether is sent to msg.sender.\nIt seems that this function can be called without restrictions.",
                    "instances": [
                      {
                        "ref_id": 0,
                        "start_line": 15
                      }
                    ]
                  },
                  {
                    "name": "Message call to external contract",
                    "type": "message_call_to_external_contract",
                    "file": "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol",
                    "description": "This contract executes a message call to the address of the transaction sender. Generally, it is not recommended to call user-supplied addresses using Solidity's call() construct. Note that attackers might leverage reentrancy attacks to exploit race conditions or manipulate this contract's state.",
                    "instances": [
                      {
                        "ref_id": 1,
                        "start_line": 15
                      }
                    ]
                  },
                  {
                    "name": "State change after external call",
                    "type": "state_change_after_external_call",
                    "file": "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol",
                    "description": "The contract account state is changed after an external call. Consider that the called contract could re-enter the function before this state change takes place. This can lead to business logic vulnerabilities.",
                    "instances": [
                      {
                        "ref_id": 2,
                        "start_line": 19
                      }
                    ]
                  }
                ],
                "count_potential_vulnerabilities": 3,
                "hash": "37bc69a8da1473c5c79a5c279cf8df9b5cca0104a55d60e5b550bfee37c04c27",
                "start_time": 1532093121,
                "end_time": 1532093127
              }
            ],
            "compilation_warnings": [
              "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol:16:7: Warning: \"throw\" is deprecated in favour of \"revert()\", \"require()\" and \"assert()\".\n      throw;\n      ^---^\n",
              "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol:6:3: Warning: No visibility specified. Defaulting to \"public\". \n  function getBalance(address u) constant returns (uint) {\n  ^ (Relevant source part starts here and spans across multiple lines).\n",
              "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol:10:3: Warning: No visibility specified. Defaulting to \"public\". \n  function addToBalance() {\n  ^ (Relevant source part starts here and spans across multiple lines).\n",
              "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol:11:33: Warning: \"msg.value\" used in non-payable function. Do you want to add the \"payable\" modifier to this function?\n    userBalances[msg.sender] += msg.value;\n                                ^-------^\n",
              "abc9341dcce-b5e3-418b-9c00-167e0df73eaa.sol:14:3: Warning: No visibility specified. Defaulting to \"public\". \n  function withdrawBalance() {\n  ^ (Relevant source part starts here and spans across multiple lines).\n"
            ]
          },
        vulnerabilities: []
    }
  }

    loadVulnerabilities(){
        var localVuls = []
    var reports = [...this.state.feedback["analyzers_reports"]]
    for (var report in reports){
        for (var vuls in reports[report]["potential_vulnerabilities"]){
            var vulName = reports[report]["potential_vulnerabilities"][vuls]["name"]
            var vulDescription = reports[report]["potential_vulnerabilities"][vuls]["description"]
            console.log(vulName + " " + vulDescription);
            localVuls.push({name: vulName, description: vulDescription});
        }
    }
    this.setState({vulnerabilities: localVuls})
}



componentWillMount(){
    this.loadVulnerabilities()
}

  render() {
    const { classes } = this.props
    console.log(this.state.vulnerabilities);

        // console.log(vulnerability.name, vulnerability.description);


    return (
        <div>
        <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <Typography className={classes.heading}>{this.state.vulnerabilities[0].name}</Typography>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
           <Typography>
           {this.state.vulnerabilities[0].description}
           </Typography>
         </ExpansionPanelDetails>
       </ExpansionPanel>
       <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <Typography className={classes.heading}>{this.state.vulnerabilities[1].name}</Typography>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
           <Typography>
           {this.state.vulnerabilities[1].description}
           </Typography>
         </ExpansionPanelDetails>
       </ExpansionPanel>
       <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <Typography className={classes.heading}>{this.state.vulnerabilities[2].name}</Typography>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
           <Typography>
           {this.state.vulnerabilities[2].description}
           </Typography>
         </ExpansionPanelDetails>
       </ExpansionPanel>
       <ExpansionPanel>
         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
           <Typography className={classes.heading}>{this.state.vulnerabilities[3].name}</Typography>
         </ExpansionPanelSummary>
         <ExpansionPanelDetails>
           <Typography>
           {this.state.vulnerabilities[3].description}
           </Typography>
         </ExpansionPanelDetails>
       </ExpansionPanel>
       </div>
    );
  }
}

export default withStyles(styles)(QuantFeedback);
