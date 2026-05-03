export interface ProcessNode {
  id: string;
  label: string;
  description: string;
  type: 'manual' | 'automated' | 'decision';
  efficiencyScore: number; // 0-100
  volume: number; // monthly transactions
  timePerTransaction: number; // minutes
}

export interface ROIResult {
  useCase: string;
  currentCost: number;
  aiCost: number;
  savings: number;
  timeline: string;
}

export interface AgentStatus {
  name: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  message: string;
}

export const INDIAN_CASE_STUDIES = [
  {
    client: "HDFC Bank - Commercial Lending",
    process: "Credit Appraisal for SMEs",
    outcome: "42x Efficiency gain",
    before: "15 days",
    after: "4 hours"
  },
  {
    client: "Apollo Hospitals - Revenue Cycle",
    process: "Insurance Claim Verification",
    outcome: "98% Accuracy",
    before: "25 min / claim",
    after: "12 sec / claim"
  },
  {
    client: "Tata Motors - Supply Chain",
    process: "Vendor Invoice Reconciliation",
    outcome: "Full Automation",
    before: "120 staff hours / month",
    after: "Real-time"
  }
];
