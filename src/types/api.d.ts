/* Pi-hole: A black hole for Internet advertisements
 * (c) 2019 Pi-hole, LLC (https://pi-hole.net)
 * Network-wide ad blocking via your own hardware.
 *
 * Web Interface
 * Type definitions for API objects
 *
 * This file is copyright under the latest version of the EUPL.
 * Please see LICENSE file for your rights under this license. */

interface ApiQuery {
  timestamp: number;
  type: number;
  status: number;
  domain: string;
  client: string;
  dnssec: number;
  reply: number;
  response_time: number;
}

interface ApiHistoryResponse {
  cursor: null | string;
  history: Array<ApiQuery>;
}

interface ApiNetworkSettings {
  interface: string;
  ipv4_address: string;
  ipv6_address: string;
  hostname: string;
}

interface ApiVersion {
  branch: string;
  hash: string;
  tag: string;
}

interface ApiVersions {
  api: ApiVersion;
  core: ApiVersion;
  ftl: ApiVersion;
  web: ApiVersion;
}

interface ApiDnsSettings {
  upstream_dns: Array<string>;
  options: {
    fqdn_required: boolean;
    bogus_priv: boolean;
    dnssec: boolean;
    listening_type: string;
  };
  conditional_forwarding: {
    enabled: boolean;
    router_ip: string;
    domain: string;
  };
}

interface ApiDhcpSettings {
  active: boolean;
  ip_start: string;
  ip_end: string;
  router_ip: string;
  lease_time: number;
  domain: string;
  ipv6_support: boolean;
  rapid_commit: boolean;
}

interface ApiFtlDbResponse {
  filesize: number;
  queries: number;
  sqlite_version: string;
}

interface ApiSuccessResponse {
  status: "success";
}

interface ApiError {
  key: string;
  message: string;
  data: any;
}

interface ApiErrorResponse {
  error: ApiError;
}

type ApiResultResponse = ApiSuccessResponse | ApiErrorResponse;

type WebLayout = "boxed" | "traditional";

interface ApiPreferences {
  layout: WebLayout;
  language: string;
}

type Status = "enabled" | "disabled" | "unknown";
type StatusAction = "enable" | "disable";

interface ApiStatus {
  status: Status;
}

interface ApiClientsGraph {
  over_time: Array<ApiClientOverTime>;
  clients: Array<ApiClientGraphInfo>;
}

interface ApiClientOverTime {
  timestamp: number;
  data: Array<number>;
}

interface ApiClientGraphInfo {
  name: string;
  ip: string;
}

interface ApiHistoryGraphItem {
  timestamp: number;
  total_queries: number;
  blocked_queries: number;
}

interface ApiQueryType {
  name: string;
  count: number;
}

interface ApiSummary {
  gravity_size: number;
  total_queries: {
    A: number;
    AAAA: number;
    ANY: number;
    SRV: number;
    SOA: number;
    PTR: number;
    TXT: number;
    [key: string]: number;
  };
  blocked_queries: number;
  percent_blocked: number;
  unique_domains: number;
  forwarded_queries: number;
  cached_queries: number;
  reply_types: {
    IP: number;
    CNAME: number;
    DOMAIN: number;
    NODATA: number;
    NXDOMAIN: number;
    [key: string]: number;
  };
  total_clients: number;
  active_clients: number;
  status: string;
}

interface ApiUpstreams {
  upstreams: Array<{
    name: string;
    ip: string;
    count: number;
  }>;
  forwarded_queries: number;
  total_queries: number;
}

interface ApiTopDomainItem {
  domain: string;
  count: number;
}

interface ApiTopBlocked {
  top_domains: Array<ApiTopDomainItem>;
  blocked_queries: number;
}

interface ApiTopDomains {
  top_domains: Array<ApiTopDomainItem>;
  total_queries: number;
}

interface ApiTopClients {
  top_clients: Array<ApiClient>;
  total_queries: number;
}

interface ApiClient {
  name: string;
  ip: string;
  count: number;
}
