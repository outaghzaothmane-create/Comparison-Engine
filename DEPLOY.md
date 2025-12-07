# Deploying to Render.com

This project is configured for one-click deployment on Render.com using the `render.yaml` Blueprint.

## Prerequisites
1.  **Push your code to GitHub.**
    - Make sure all your recent changes are pushed to your remote repository.

## Step-by-Step Deployment

1.  **Log in to [Render.com](https://dashboard.render.com/).**
2.  Click on the **"New+"** button in the top right and select **"Blueprint"**.
3.  Connect your GitHub account if you haven't already.
4.  **Select your repository** (`outaghzaothmane-create/Comparison-Engine`).
5.  Render will automatically detect the `render.yaml` file and show you the proposed services (`os-directory`).
6.  Click **"Apply Blueprint"**.

## Environment Variables
The `render.yaml` file sets up the following defaults:
- `NODE_VERSION`: `20`

**Important:** You may need to update `NEXT_PUBLIC_APP_URL` in the Render dashboard after your service is live and you have your `.onrender.com` URL (or custom domain).

## Troubleshooting
- **Build Fails**: Check the "Logs" tab in Render. Ensure `package.json` scripts are correct.
- **Runtime Errors**: If the app crashes on start, verify that it's listening on the port Render expects (Next.js defaults to 3000, which Render automatically detects).
