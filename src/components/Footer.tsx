const Footer = () => {
  return (
    <footer className="bg-card py-6 px-4 mt-8">
      {/* Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
        <a href="#" className="text-giveaway-green hover:underline">Privacy Policy</a>
        <a href="#" className="text-giveaway-green hover:underline">Terms & Conditions</a>
        <a href="#" className="text-giveaway-green hover:underline">Disclaimer</a>
        <a href="#" className="text-giveaway-green hover:underline">Contact us</a>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground">
        <p>© 2025 Google Play Redeem Info | Independent educational</p>
        <p>landing page (not affiliated with Google LLC) Copyright © 2026</p>
        <p className="mt-1">
          Powered by{" "}
          <a href="#" className="text-giveaway-green hover:underline">[opgta6.com]</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
