/* Pi-hole: A black hole for Internet advertisements
*  (c) 2017 Pi-hole, LLC (https://pi-hole.net)
*  Network-wide ad blocking via your own hardware.
*
*  Web Interface
*  Settings :: DNS
*
*  This file is copyright under the latest version of the EUPL.
*  Please see LICENSE file for your rights under this license. */

import React, { Component } from "react";
import { translate } from "react-i18next";
import { ignoreCancel, makeCancelable } from "../../util";
import api from "../../util/api";
import DnsList from "./DnsList";
import { Button, Col, Form, FormGroup } from "reactstrap";
import ConditionalForwardingSettings from "./ConditionalForwardingSettings";
import DnsOptionSettings from "./DnsOptionSettings";

class DNSInfo extends Component {
  state = {
    upstreamDns: [],
    conditionalForwarding: {
      enabled: false,
      routerIp: "",
      domain: ""
    },
    options: {
      fqdnRequired: false,
      bogusPriv: false,
      dnssec: false,
      listeningType: "single"
    }
  };

  constructor(props) {
    super(props);
    this.updateDNSInfo = this.updateDNSInfo.bind(this);
  }

  updateDNSInfo() {
    this.updateHandler = makeCancelable(api.getDNSInfo(), {
      repeat: this.updateDNSInfo,
      interval: 600000
    });
    this.updateHandler.promise
      .then(res => {
        this.setState({
          upstreamDns: res.upstream_dns,
          conditionalForwarding: {
            enabled: res.conditional_forwarding.enabled,
            routerIp: res.conditional_forwarding.router_ip,
            domain: res.conditional_forwarding.domain
          },
          options: {
            fqdnRequired: res.options.fqdn_required,
            bogusPriv: res.options.bogus_priv,
            dnssec: res.options.dnssec,
            listeningType: res.options.listening_type
          }
        });
      })
      .catch(ignoreCancel);
  }

  componentDidMount() {
    this.updateDNSInfo();
  }

  componentWillUnmount() {
    this.updateHandler.cancel();
  }

  handleUpstreamAdd = upstream => {
    this.setState({
      upstreamDns: this.state.upstreamDns.concat(upstream)
    });
  };

  handleUpstreamRemove = upstream => {
    this.setState({
      upstreamDns: this.state.upstreamDns.filter(item => item !== upstream)
    });
  };

  handleConditionalForwardingUpdate = conditionalForwarding => {
    this.setState({ conditionalForwarding });
  };

  handleDnsOptionsUpdate = options => {
    this.setState({ options });
  };

  saveSettings = e => {
    e.preventDefault();
  };

  render() {
    const { t } = this.props;

    return (
      <Form onSubmit={this.saveSettings}>
        <FormGroup row>
          <Col sm={6}>
            <h3>{t("Upstream DNS Servers")}</h3>
            <DnsList
              onAdd={this.handleUpstreamAdd}
              onRemove={this.handleUpstreamRemove}
              upstreams={this.state.upstreamDns}
            />
          </Col>
          <Col sm={6}>
            <h3>{t("Conditional Forwarding")}</h3>
            <ConditionalForwardingSettings
              settings={this.state.conditionalForwarding}
              onUpdate={this.handleConditionalForwardingUpdate}
              t={t}
            />
            <h3>{t("DNS Options")}</h3>
            <DnsOptionSettings
              settings={this.state.options}
              onUpdate={this.handleDnsOptionsUpdate}
              t={t}
            />
          </Col>
        </FormGroup>
        <Button type="submit">{t("Apply")}</Button>
      </Form>
    );
  }
}

export default translate(["common", "settings"])(DNSInfo);
