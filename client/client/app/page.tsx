"use client";

import React from "react";
import { Button, Typography, Row, Col, Card, Space } from "antd";
import { useRouter } from "next/navigation";
import {
  BankOutlined,
  FileProtectOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import "@/styles/landing-dark.css";

const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: <BankOutlined style={{ fontSize: 48, color: "#40a9ff" }} />,
      title: "Easy Loan Application",
      description: "Apply for loans quickly with a simple and secure process.",
    },
    {
      icon: <FileProtectOutlined style={{ fontSize: 48, color: "#73d13d" }} />,
      title: "Secure Data",
      description: "Your personal and financial information is protected.",
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 48, color: "#ff7875" }} />,
      title: "Fast Approval",
      description: "Get loan approvals in record time with automation.",
    },
  ];

  return (
    <div className="landing-page-dark">
      {/* Hero Section */}
      <section className="hero-section-dark">
        <div className="hero-content-dark">
          <Title level={1} className="hero-title-dark">
            Loan Management
            <br />
            <span className="gradient-text-dark">Made Powerful</span>
          </Title>
          <Paragraph className="hero-description-dark">
            Register, apply, and track your loan journey seamlessly. A smarter way to manage your finances.
          </Paragraph>
          <Space size="large" className="hero-buttons-dark">
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/register")}
              className="cta-button-dark"
            >
              Get Started
            </Button>
            <Button
              size="large"
              onClick={() => router.push("/login")}
              className="secondary-button-dark"
            >
              Sign In
            </Button>
          </Space>
        </div>
        <div className="hero-image-dark">
          <div className="floating-card-dark card-1">
            <div className="card-content-dark">💳</div>
          </div>
          <div className="floating-card-dark card-2">
            <div className="card-content-dark">📑</div>
          </div>
          <div className="floating-card-dark card-3">
            <div className="card-content-dark">⚡</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-dark">
        <div className="container-dark">
          <Title level={2} className="section-title-dark">
            Why Choose Us?
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="feature-card-dark" hoverable>
                  <div className="feature-icon-dark">{feature.icon}</div>
                  <Title level={4} className="feature-title-dark">
                    {feature.title}
                  </Title>
                  <Paragraph className="feature-description-dark">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-dark">
        <div className="container-dark">
          <Card className="cta-card-dark">
            <Title level={2} className="cta-title-dark">
              Ready to Apply for Your Loan?
            </Title>
            <Paragraph className="cta-description-dark">
              Join thousands of borrowers and manage your loans effortlessly.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              onClick={() => router.push("/register")}
              className="cta-button-dark"
            >
              Create Account
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
