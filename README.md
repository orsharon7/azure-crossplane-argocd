# sample-app

This repository contains a sample modern application to be used with ArgoCD. The sample app includes Kubernetes manifests for deployment, service, and ingress.

## ArgoCD Application Creation

To create an ArgoCD application using this repository, run the following command:

```sh
argocd app create sample-app --repo https://github.com/orsharon7/sample-app.git --path sample-app --dest-server https://kubernetes.default.svc --dest-namespace default
```

## Deploying the Sample App using ArgoCD

1. Install ArgoCD by following the instructions in the [ArgoCD documentation](https://argo-cd.readthedocs.io/en/stable/getting_started/).
2. Create the ArgoCD application using the command provided above.
3. Sync the application to deploy the sample app:

```sh
argocd app sync sample-app
```

4. Access the sample app using the ingress host specified in the `sample-app/ingress.yaml` file (e.g., `http://sample-app.local`).

## Sample App Frontend

The sample app includes a modern frontend with HTML, CSS, and JavaScript files located in the `sample-app/frontend/` directory. The frontend provides a simple and visually appealing interface for the sample app.
