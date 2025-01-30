### Full Speaker Text for Platform Engineering Session

#### **1. Introduction (2 minutes)**

"Let’s dive into a problem we all know too well. Developers waiting days, sometimes weeks, for environments to be provisioned. Teams are frustrated, DevOps is overwhelmed, and innovation slows down. But today, there’s a better way: platform engineering with GitOps."

"As Arik mentioned earlier, platform engineering helps us simplify complex processes, reducing friction for developers. And that’s exactly what we’ll see today."

"We’ll walk through how a developer can request an environment with just a GitHub issue. Then, using GitHub Actions, ArgoCD, and Crossplane, the infrastructure is provisioned on Azure—automatically, securely, and reproducibly. Let’s break it down."

---

#### **2. The Problem: Developer Needing an Environment (3 minutes)**

"Imagine this: a developer, has an urgent feature to test. She needs a dev environment. But the DevOps team is swamped. She’s stuck. Frustrated, she pings the team on Slack, sends a few emails, and then waits. Hours turn into days."

"Now, the developer works in a company that’s adopted platform engineering. Instead of waiting, they simply open a GitHub issue. This action eliminates manual provisioning delays and removes the DevOps bottleneck. Their company embraces **GitOps**, managing infrastructure and applications through Git as the single source of truth. And that’s where our journey begins."

> **Demo Step**: Show the GitHub issue page where the developer requests the environment.

---

#### **3. Demo Walkthrough (15 minutes)**

##### **Step 1: Developer Workflow**

"The developer opens a GitHub issue requesting a dev environment. Behind the scenes, a GitHub Action is triggered. It generates a YAML configuration file that defines the infrastructure requirements."

"Instead of directly applying the file, it creates a **pull request (PR)**. This PR acts as a gate, preventing unnecessary environments from being created accidentally. It enforces an approval workflow before any infrastructure is provisioned. This is a core GitOps best practice—every infrastructure change is reviewed, versioned, and approved before being merged."

> **Demo Step**: Show the GitHub Actions page and highlight the workflow run triggered by the issue. Then, navigate to the pull request and show the YAML file created.

##### **Step 2: PR Review and Merge**

"The PR is reviewed and approved. Once merged, ArgoCD detects the change automatically, since it continuously monitors the `main` branch for updates. ArgoCD then applies the changes, and Crossplane provisions the required resources in Azure."

> **Demo Step**: Show the [ArgoCD dashboard](https://172.188.212.150/) where the application is synced and Crossplane-managed resources are being provisioned.

##### **Step 3: Deployment with Crossplane**

"The developer's environment is fully provisioned through an automated pipeline: the AKS cluster is operational, the Azure OpenAI instance with the embedding model is deployed, and the storage account has been configured with the necessary policies. They can immediately begin their vectorization project with all required resources in place."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready.

"Before we explore the provisioned resources, let’s dive into the architecture."

---

#### **4. Architectural Insights and Benefits (7 minutes)**

"Let’s break down the architecture and the benefits of using GitOps, ArgoCD, and Crossplane."

"At the heart of this process is the **management cluster**, which orchestrates both infrastructure and workloads. It consists of three key components, each playing a critical role."

- **ArgoCD**: This is our GitOps controller. It continuously monitors designated directories in the GitHub repository. When a change is detected, ArgoCD applies the declared state to the Kubernetes cluster. This ensures **automated synchronization**, preventing drift and enforcing consistency.

- **Crossplane**: Running inside Kubernetes, Crossplane extends its capabilities by allowing us to manage cloud resources as **native Kubernetes objects**. Instead of using CLI commands or scripts to interact with Azure, we define infrastructure declaratively through **Custom Resources (CRs)**. This makes provisioning reproducible and version-controlled.

- **Kubernetes API & Custom Resource Definitions (CRDs)**: Crossplane extends Kubernetes by introducing **CRDs**, which allow us to define new resource types. These CRDs register infrastructure resources as **first-class citizens** within Kubernetes, enabling native interaction through the Kubernetes API. One key example is **CompositeResourceDefinition (XRD)**, which abstracts multiple cloud resources into a single logical unit. XRDs allow developers to request entire environments—such as a fully configured Kubernetes cluster, storage, and database—without dealing with the underlying cloud-specific details.

  "From a technical perspective, when an XRD is defined, Kubernetes treats it like any other native resource. The Crossplane control plane then watches for instances of this resource and applies the associated **Composition**, which maps the XRD to concrete cloud services. This mechanism enables separation of concerns: platform engineers define and maintain reusable infrastructure templates, while developers interact with simplified, high-level APIs tailored to their needs."

"By using Crossplane, infrastructure is treated as a Kubernetes resource. Instead of managing cloud resources with external tools, we leverage Kubernetes' built-in reconciliation loop. This ensures that any drift or unintended changes are automatically corrected, maintaining the declared state."

"Because Crossplane runs **inside Kubernetes**, it benefits from its declarative nature. If a cloud resource is manually modified outside the pipeline, Crossplane detects and remediates the change, eliminating configuration drift and reducing operational overhead."

"Additionally, all resources provisioned by Crossplane are managed as **ArgoCD applications**. This ensures full **version control, synchronization, and auditability**, treating infrastructure just like application code."

> **Demo Step**: Highlight the **App of Apps** pattern in the ArgoCD dashboard. Show how different layers of the architecture are modularly managed.

"We use the **App of Apps pattern** in ArgoCD for hierarchical deployments. This allows complex applications to be broken into smaller, modular components while ensuring dependency synchronization. The repository structure reflects this modularity, with dedicated directories for **XRDs, Compositions, and Provider Configurations**, all automatically synchronized by ArgoCD."

"By integrating Crossplane with GitOps, we achieve **continuous reconciliation, automated version control, and robust drift correction**—all while maintaining full visibility into every infrastructure change."



---

#### **5. Understanding XRDs and Compositions (Level 300)**

"Now, let’s talk about **XRDs (Composite Resource Definitions)** and **Compositions**. These are core components in Crossplane that allow us to create scalable, reusable infrastructure configurations."

"An **XRD** defines a new composite resource in Kubernetes. Instead of provisioning low-level cloud components separately, we create an abstraction that combines multiple services. For example, our `DevEnvironment` XRD includes an AKS cluster, an Azure OpenAI instance, and a storage account, bundled as a single resource definition."

"A **Composition** maps an XRD to its underlying infrastructure. It defines **how** a composite resource translates into actual cloud components. This means we can modify resource settings—such as VM sizes or database SKUs—without affecting the interface used by developers."

"The benefits are clear: **abstraction, standardization, and reusability**. Developers don’t need to worry about infrastructure details; they simply request an environment, and Crossplane ensures a standardized, policy-compliant setup."

> **Demo Step**: Show the `DevEnvironment` XRD and its Composition in the GitHub repository.

---

#### **6. Closing Thoughts (3 minutes)**

"We’ve now seen how a developer can request infrastructure through GitHub, how GitOps enforces a structured workflow, and how ArgoCD and Crossplane integrate to manage infrastructure in a Kubernetes-native way."

"This process ensures consistency, security, and scalability. We’ve gone from an infrastructure request to a fully provisioned environment with just a few Git operations—without any manual steps."

"And this is just the beginning. This pipeline can be extended to deploy the developer’s application as well. The same workflow could be enhanced to pull application configurations from Git, ensuring that both infrastructure and workloads are deployed in a unified, declarative manner."

> **Demo Step**: Return to the GitHub issue and show the automated comments confirming the environment is ready. Tie it back to the developer’s experience.

