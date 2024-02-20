import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as docker from "@pulumi/docker";

const config = new pulumi.Config();

// pulumi config set MY_NAME bugs-bunny  
const name = config.require("MY_NAME");

new aws.s3.Bucket("policy-as-code-workshop-"+name);

new aws.ec2.Instance("policy-as-code-workshop-"+name, {
  // https://cloud-images.ubuntu.com/locator/ec2/
  ami: "ami-08f7912c15ca96832", // Replace with the AMI ID for your region, us-west-2
  associatePublicIpAddress: false,
  instanceType: "t3.micro"
});

new docker.Image("policy-as-code-workshop-"+name, {
  imageName: "docker.io/joshkodroff/pulumi-policy-test",
  buildOnPreview: false,
  build: {
    dockerfile: "../app/Dockerfile",
    platform: "linux/amd64"
  }
});
