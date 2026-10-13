# Security

This is a solo-maintained OpenChamber extension. The maintainer reads every report personally and
treats them as a high priority.

## Reporting a vulnerability

Please **do not open a public GitHub issue** for suspected vulnerabilities. The issue tracker is
visible to everyone, and a public repro of a real bug helps attackers more than it helps the fix.

Email the maintainer at `michaelruelas@gmail.com` with the subject prefixed `[security]`. Include:

- A short description of the bug.
- A minimal repro, if you have one. Paste the request, the response and the surface (panel, page,
  picker, resolver) you exercised.
- The version of the extension, the OpenChamber build, and the Kaneo server version if you can
  read it.

You can encrypt the report with the maintainer's PGP key if you prefer; the public key is at
<https://github.com/qubitquilt.gpg>.

## What to expect

- An acknowledgement within seven days.
- A fix or a workaround within thirty days for anything that lands in the main branch.
- A note in the release when the fix ships, unless the disclosure needs to stay quiet.

## Out of scope

Reports that the maintainer will not action:

- Best-practice suggestions that do not name a real attack on this extension.
- Bugs in the Kaneo server itself (please report to Kaneo).
- Bugs in OpenChamber itself.
- Findings that only apply to a fork the maintainer does not control.

## Threat model

The extension is a guest inside an OpenChamber iframe. It cannot read the page, cannot reach the
network except through `host.request`, and runs a strict `Content-Security-Policy` on every entry.
The trust boundaries are listed in `AGENTS.md`; a contributor who crosses one needs a note in the
PR description.

## Hall of fame

No reports yet.
